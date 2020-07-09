import { TodoModel } from "./todo.model";

export class User {
  email: string;
  password: string;
  todo: TodoModel[];
  constructor(email: string, password: string, todo: TodoModel[]) {
    this.email = email;
    this.password = password;
    this.todo = todo;
  }
}
