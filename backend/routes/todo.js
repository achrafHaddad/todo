const express = require("express");
const passport = require("passport");
const Todo = require("../model/todo.schema");
const User = require("../model/user.schema");

let router = express.Router();

router.get(
  "/",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      let list = await User.findById(req.user.user, "todo");

      let todos = await Todo.find().where("_id").in(list.todo).exec();
      res.send(todos);
    } catch {
      console.log("error");
    }
  }
);

router.post(
  "/",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    const todo = new Todo({
      name: req.body.name,
    });
    const user = await User.findById(req.user.user);

    const result = await todo.save();
    await User.findByIdAndUpdate(user._id, { $push: { todo: result._id } });
    console.log("success");

    res.send(result);
  }
);

router.put(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    let status = false;
    const todo = await Todo.findById(req.params.id);
    if (todo.status === status) await todo.updateOne({ status: !status });
    else await todo.updateOne({ status: status });

    res.send(todo);
  }
);

router.delete(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    await User.findByIdAndUpdate(req.user.user, {
      $pull: { todo: req.params.id },
    });
    await Todo.deleteOne({ _id: req.params.id });

    res.send({ message: "deleted" });
  }
);

module.exports = router;
