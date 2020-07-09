const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("./auth");

const todo = require("./routes/todo");
const user = require("./routes/user");
const router = require("./routes/ApiUser");
const file = require("./upfiles");

mongoose
  .connect("mongodb://localhost/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log("error", err));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/todo", todo);
app.use("/user", user);
app.use("/upload", file);
app.use("/auth", router);

const port = process.env.PORT || 3000;

app.set("port", port);

app.listen(port);
