import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { TodoModel } from "../todo.model";
import { HttpClient } from "@angular/common/http";
import { DOCUMENT } from "@angular/common";
import * as jwt_decode from "jwt-decode";
import { User } from "../user.model";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  constructor(private http: HttpClient, @Inject(DOCUMENT) document) {}

  todoForm: FormGroup;
  todos: TodoModel[] = [];
  id = null;
  uId;
  upFiles: Array<File> = [];
  test: FileList;
  list = [];
  onAdd() {
    let task = this.todoForm.value.todo;
    let todo = new TodoModel(task, false, this.id, new Date());

    this.http
      .post<TodoModel>(`http://localhost:3000/todo`, todo)
      .subscribe((res) => {
        console.log(res);

        this.todos.push(todo);
        this.todoForm.reset();
        this.getTodo();
      });
  }

  onDelete(i) {
    let id = this.todos[i]._id;
    this.http.delete(`http://localhost:3000/todo/${id}`).subscribe((del) => {
      console.log(del);

      this.todos.splice(i, 1);
    });
  }

  onUpdateStatus(todo) {
    let id = todo._id;
    console.log(todo.status);
    this.http
      .put(`http://localhost:3000/todo/${id}`, todo.status)
      .subscribe((res) => {
        console.log(res);
      });
  }

  getTodo() {
    const token = localStorage.getItem("token");
    this.uId = jwt_decode(token).data._id;
    this.http
      .get<User>(`http://localhost:3000/auth/${this.uId}`)
      .subscribe((res) => {
        this.list = res.todo;
      });

    this.http
      .get<TodoModel[]>(`http://localhost:3000/todo`)
      .subscribe((todo) => {
        let filered = [];
        if (this.list) {
          this.list.forEach((l) => {
            let fil = todo.find((t) => t._id == l);

            filered.push(fil);
          });
          this.todos = filered;
        }
      });
  }

  fileChange(file) {
    if (file.target.files.length > 4) {
      alert("you can only upload 4 files max.");
      document.getElementById("imgUpload")["value"] = "";
    }

    this.upFiles = file.target.files[0];
  }

  upFile() {
    let formData = new FormData();
    for (var i = 0; i < 4; i++) {
      formData.append("myFile[]", this.upFiles[i]);
    }
    // formData.append("myFile", this.upFiles);

    this.http
      .post("http://localhost:3000/upload", formData)
      .subscribe((response) => {
        console.log("response received is ", response);
      });
  }
  ngOnInit() {
    this.getTodo();

    this.todoForm = new FormGroup({
      todo: new FormControl(),
    });
  }
}
