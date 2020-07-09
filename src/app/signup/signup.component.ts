import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { User } from "../user.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  signUpForm: FormGroup;

  onSubmit() {
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    const user = new User(email, password, []);
    this.http.post("http://localhost:3000/auth/signup", user).subscribe(
      () => {
        this.router.navigate(["/"]);
        this.signUpForm.reset();
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });
  }
}
