const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");

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
      const emailToken = jwt.sign({ email: req.body.email }, secret);
      const url = "http://localhost:3000/users/confirm/" + emailToken;
      await transporter.sendMail({
        to: req.body.email,
        subject: "Account verification",
        html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
        <a href="${url}"> Click para confirmar tu registro</a>
        `,
      });

      res.status(201).send({
        message:
          "user created succesfully, please checkout your mail for confirmation",
      });
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
        return console.log("user or password incorrect");
      }
      const match = bcrypt.compareSync(req.body.password, user.password);
      if (!match) {
        return res.status(400).send({ message: "user or password incorrect" });
      }
      if (!user.verified) {
        return res.status(400).send({ message: "Verify your account" });
      }

      token = jwt.sign({ _id: user._id }, secret);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res
        .status(201)
        .send(`welcome  ${user.name.toUpperCase()} token: ${token}`);
    } catch (error) {
      console.log(error);
    }
  },
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "See you later alligator" });
    } catch (error) {
      console.log(error);
    }
  },

  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      console.log(token);
      const payload = jwt.verify(token, secret);
      const user = await User.findOne({ email: payload.email });
      user.verified = true;
      user.save();
      res.status(201).send(user);
    } catch (error) {
      console.log(error);
    }
  },
  async findbyName(req, res) {
    try {
      const user = await User.find({
        name: { $regex: req.params.name, $options: "i" },
      });
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  },
  async findById(req, res) {
    try {
      const user = await User.findById(req.params._id);
      if (!user) return res.send(`User not found`);
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  },
  async follow(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params._id);
      const logged = req.user._id.toString();
      const followersId = user.followersId;
      const followers = user.followers;
      if (!user) return res.send("User not found");
      if (followersId.indexOf(req.user._id) != -1) {
        res.send("siguiendo");
      } else {
        followers.push(req.user.name);
        followersId.push(logged);
      }
      user.save();
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  },
  // async unfollow(req,res){
  //   try {
  //     const user = await User.findByIdAndUpdate(req.params._id);
  //     const logged = req.user._id.toString();
  //     const followersId = user.followersId;
  //     const follower = user.followers;
  //     if (!user) return res.send("User not found");
  //     if (followersId.indexOf(req.user._id) != -1) {
  //       res.send("siguiendo");
  //     } else {
  //       followers.push(req.user.name);
  //       followersId.push(logged);
  //     }
  //     user.save();
  //     res.send(user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
};

module.exports = UserController;
