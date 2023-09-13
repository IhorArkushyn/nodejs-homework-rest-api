const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "snapscan@meta.ua",
    passworg: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: "tju54764@omeie.com",
  from: "snapscan@meta.ua",
  subject: "Test email",
  html: "<p><strong>Test email</strong>from location:3000</p>",
};

transport
  .sendMail(email)
  .then(() => console.log("Verification email sent"))
  .catch((error) => console.log(error.message));
