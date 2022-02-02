const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "jsprogrammingtest@gmail.com",
    pass: "Aapatatas23",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
module.exports = transporter;
