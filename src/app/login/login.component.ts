import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../service/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  token: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  logForm: FormGroup;

  onSubmit() {
    const user = {
      email: this.logForm.value.email,
      password: this.logForm.value.password,
    };
    this.auth.login(user).subscribe(
      (res: { token: string }) => {
        localStorage.setItem("token", res.token);
        this.router.navigate(["/todo"]);
      },
      (err) => {
        alert(err);
      }
    );
  }

  ngOnInit(): void {
    this.logForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
    if (this.route) return this.auth.deleteToken();
  }
}
