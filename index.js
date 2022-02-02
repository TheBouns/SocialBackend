const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
require("dotenv").config();

const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/keys");
const PORT = 3000;

app.use(express.json());
app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));

mongoose
  .connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("conected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(PORT, console.log(`Server conected port ${PORT}`));
