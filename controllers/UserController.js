const { create } = require("../models/User");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const UserController = {
  async getAll(req, res) {
    const users = await User.find();
    res.send(users);
  },
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
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    try {
      if (!user) {
        console.log("user or password incorrect");
      }
      const match = bcrypt.compareSync(req.body.password, user.password);
      if (!match) {
        res.status(201).send({ message: "user or password incorrect" });
      }

      token = jwt.sign({ id: user._id }, secret);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.status(201).send({ message: "welcome" + user.name, token });
    } catch (error) {
      console.log(error);
    }
  },
  //   async logout(req, res) {
  //     try {
  //       const user = await User.deleteOne({ token: req.headers.authorization });
  //       console.log(user);
  //       res.status(201).send({ message: `logged out ${user.token}` });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
};

module.exports = UserController;
