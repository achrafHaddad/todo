const multer = require("multer");
const express = require("express");

const router = express.Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.toLowerCase());
  },
});

let upload = multer({ storage: storage });
// let upload = multer({ dest: "uploads" });

router.post("/", upload.array("myFile[]", 4), (req, res) => {
  let file = req.files;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  res.send(file);
});

module.exports = router;
