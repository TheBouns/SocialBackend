const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    res.send("no token given");
  }
  try {
    const payload = jwt.verify(token, secret);
    const user = await User.findOne({ _id: payload._id, tokens: token });
    if (!user) {
      return res.status(401).send({ message: "Not athorized" });
    }
    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = verifyToken;
