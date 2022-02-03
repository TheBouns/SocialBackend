const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, secret);
    const user = await User.findOne({ id: payload._id, tokens: token });
    if (!user) {
      return res.status(401).send({ message: "Not athorized", user });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
const author = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.send("You can not get access");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { auth, author };
