const express = require("express");
const app = express();

const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/keys");
const PORT = 3000;

app.use(express.json());

mongoose
  .connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("conected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(PORT, console.log(`Server conected port ${PORT}`));
