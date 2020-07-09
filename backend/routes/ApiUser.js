var express = require("express");
var User = require("../model/user.schema");
var jwt = require("jsonwebtoken");
var router = express.Router();
var bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
  let users = await User.find();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

router.post("/signup", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  const unique = await User.findOne({ email: req.body.email });
  if (unique) return res.status(400).send({ message: "email already in use" });

  let salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.send(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.send("wrong email or password");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send("wrong email or password");

  let token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: { _id: user._id, email: user.email },
    },
    "secret"
  );

  res.send({ token: token });
});

module.exports = router;
