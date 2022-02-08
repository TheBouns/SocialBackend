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
router.put("/comment/:_id", auth, PostController.insertcomment);

module.exports = router;
