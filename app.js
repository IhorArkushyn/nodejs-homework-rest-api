// MongoDB PASSWORD zLLrRCWmDGEHUxHA;

// const mongoose = require("mongoose");
// const DB_HOST =
//   "mongodb+srv://Ihor:zLLrRCWmDGEHUxHA@cluster0.jjt4sxx.mongodb.net/contacts_list?retryWrites=true&w=majority";
// mongoose
//   .connect(DB_HOST)
//   .then(() => console.log("Database connection successful"))
//   .catch((err) => console.log(err.message));
// "Database connection successful";
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
