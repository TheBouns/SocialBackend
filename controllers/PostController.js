const Post = require("../models/Post");

const PostController = {
  async find(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const posts = await Post.find()
      .limit(limit)
      .skip((page - 1) * limit);
    res.send(posts);
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
      const post = await Post.findById(req.params._id);
      if (!post) return res.send("post dosent exist");
      res.send(post);
    } catch (error) {
      console.log(error);
    }
  },
  async delete(req, res) {
    try {
      await Post.findByIdAndDelete(req.params._id);
      res.send("Post has been deleted");
    } catch (error) {
      console.log(error);
    }
  },
  async like(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params._id);
      const user = post.userId.toString();
      if (post.liked.indexOf(user) == -1) {
        post.liked.push(user);
        post.likes++;
        post.save();
        return res.send({ message: "+1 like", post });
      } else {
        return res.send({ message: "Already like given" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  async dislike(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      const user = post.userId.toString();
      if (post.liked.indexOf(user) != -1) {
        post.liked.splice(post.liked.indexOf(user), 1);
        post.likes--;
      }
      post.save();
      res.send(post);
    } catch (error) {
      console.log(error);
    }
  },
  async insertcomment(req, res) {
    try {
      const post = await Post.findOneAndUpdate(
        req.params._id,
        {
          $push: {
            comments: {
              ...req.body,
              userId: req.user._id,
              userName: req.user.name,
            },
          },
        },
        { new: true }
      );
      res.send(post);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = PostController;
