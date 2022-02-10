const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    title: {
      type:String,
      required:[true, "please set a title"],
      minlength:4
    },
    description:{
      type: String,
      required:[true, "please set a valid description"],
      minlength:10
    },
    img: String,
    likes: [],

    comments: [
      {
        userId: { type: ObjectId, ref: "User" },
        userName: { type: String, ref: "User" },
        comment: String,
        likes: [],
        img: String,
        edited: {
          type: Boolean,
          default: false,
        },
      },
    ],
    userId: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
