const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const authen = async (req, res, next) => {
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

module.exports = { authen };
