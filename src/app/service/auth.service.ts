import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user) {
    return this.http.post("http://localhost:3000/auth/login", user);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  deleteToken() {
    return localStorage.removeItem("token");
  }
}
