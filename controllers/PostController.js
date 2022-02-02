const Post = require("../models/Post");

const PostController = {
  async find(req, res) {
    res.send(await Post.find());
  },
  async create(req, res) {
    try {
      const post = await Post.create({
        ...req.body,
        userId: req.user._id,
        title: req.body.title.toLowerCase(),
      });
      res.send(post);
    } catch (error) {
      console.log(error);
    }
  },
  async findByName(req, res) {
    const post = await Post.aggregate([
      {
        $match: {
          title: req.params.name.toLowerCase(),
        },
      },
    ]);
    res.send(post);
  },
};

module.exports = PostController;
