const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    email: String,
    role: String,
    tokens: [],
    followers: [],
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
UserSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.tokens;
  delete user.password;
  //delete user.verified;
  //delete user.role;
  delete user.updatedAt;
  delete user.__v;
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
