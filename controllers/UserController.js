const { create } = require("../models/User");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const UserController = {
  async create(req, res) {
    try {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({ ...req.body, password: hash });
      res.status(201).send({ message: "user created succesfully", user });
    } catch (error) {
      console.log(error);
      res.send("Something went wrong");
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (!user) {
        console.log("user or password incorrect");
      }
      const match = bcrypt.compareSync(req.body.password, user.password);
      if (!match) {
        res.status(201).send({ message: "user or passwor incorrect" });
      }
      res.send({ message: `welcome again ${user.name}` });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = UserController;
