const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT } = process.env;
// "mongodb+srv://Ihor:zLLrRCWmDGEHUxHA@cluster0.jjt4sxx.mongodb.net/contacts_list?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
