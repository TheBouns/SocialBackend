const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { auth, author } = require("../middleware/tokenValidation");
const uploadGenerator = require("../middleware/multer");

router.get("/", PostController.find);
router.get("/:title", auth, PostController.findByName);
router.get("/id/:_id", auth, PostController.findById);
router.put("/likes/:_id/", auth, PostController.like);
router.post("/dislikes/:_id", auth, PostController.dislike);
router.delete("/:_id", PostController.delete);
router.post("/", auth, PostController.create);
router.put(
  "/:_id",
  auth,
  author,
  uploadGenerator.single("img"),
  PostController.update
);
router.post(
  "/comment/:_id",
  auth,
  uploadGenerator.single("img"),
  PostController.insertcomment
);
router.put(
  "/comment/update/comment/:_idPost/:_id",
  auth,
  uploadGenerator.single("img"),

  PostController.updateComment
);
router.put(
  "/comment/update/delete/:_idPost/:_id",
  auth,
  PostController.deleteComment
);
router.put("/comment/update/like/:_idPost/:_id", auth, PostController.like);
router.put("/comment/update/unlike/:_idPost/:_id", auth, PostController.unlike);

module.exports = router;
