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
          title: req.params.title.toLowerCase(),
        },
      },
    ]);
    res.send(post);
  },
  async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      res.status(201).send(post);
    } catch (error) {
      console.log(error);
    }
  },
  async findById(req, res) {
    try {
      res.send(await Post.findById(req.params._id));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = PostController;
