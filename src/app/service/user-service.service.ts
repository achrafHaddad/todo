import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(email) {
    let user: any = [];
    this.http.get<User[]>("http://localhost:3000/auth");
  }
}
