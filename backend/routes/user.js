const express = require("express");
const User = require("../model/user.schema");
const Todo = require("../model/todo.schema");

let router = express.Router();

router.get("/", async (req, res) => {
  try {
    let users = await User.find().populate("todo");
    res.send(users);
  } catch {
    console.log("error");
  }
});

router.post("/", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  const result = await user.save();

  console.log("success");

  res.send(result);
});

router.put("/:id/:idTodo", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    $push: { todo: req.params.idTodo },
  });

  res.send(user);
});

router.delete("/:id/:do", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    $pull: { todo: req.params.do },
  });
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  await User.deleteOne({ _id: req.params.id });

  res.send({ message: "deleted" });
});

module.exports = router;
