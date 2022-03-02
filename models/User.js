const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type:String,
      // required: [true, "Please allow your name"],
    },
    password:{
      type:String,
      
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Este correo no es válido"],
      // required: [true, "Please set an email"],
    },
    birthday:{
      type:Date,
    },
    age:{
      type: Number,
    },
    maritalSt:{
      type:String,
    },
    interest:{
      type:String,
    },
    city:{
      type:String
    },
    website:{
      type:String,
    },
    sex:{
      type:String,
    },
    role:{
      type:String,
      default:"admin"
    },
    tokens: [],
    followers: [],
    verified: {
      type: Boolean,
      default: false,
    },
    postId: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
    followersId: [{ type: String, ref: "User" }],
    profileImg: {
      type: String,
      default: "creeper.jpg",
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
  //delete user.followersId;
  delete user.updatedAt;
  delete user.__v;
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
