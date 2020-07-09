export class TodoModel {
  name: string;
  status: Boolean;
  _id: string;
  date: Date;
  constructor(name: string, status: boolean, _id: string, date: Date) {
    this.name = name;
    this.status = status;
    this._id = _id;
    this.date = date;
  }
}
