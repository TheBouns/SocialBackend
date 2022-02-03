const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    img: String,
    likes: {
      type: Number,
      default: 0,
      userId: { type: ObjectId, ref: "User" },
    },

    comments: [
      {
        userId: { type: ObjectId, ref: "User" },
        userName: { type: String, ref: "User" },
        comment: String,
      },
    ],
    userId: {
      type: ObjectId,
      ref: "User",
    },
    liked: [],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
