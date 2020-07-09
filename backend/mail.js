const nodemailer = require("nodemailer");

async function sendMail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "achrafmail7@gmail.com",
      pass: "ezr",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return await transporter.sendMail({
    from: "achrafmail7@gmail.com",
    to: "achrafmail7@yahoo.fr",
    subject: "Hello ✔",
    text: "Hello world?",
  });
}

sendMail().catch(console.error);
