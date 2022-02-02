const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { auth } = require("../middleware/tokenValidation");

router.get("/", PostController.find);
router.get("/:title", auth, PostController.findByName);
router.get("/id/:_id", auth, PostController.findById);
router.post("/likes/:_id", PostController.like);
router.post("/dislikes/:_id", PostController.dislike);
router.delete("/:_id", PostController.delete);
router.post("/", auth, PostController.create);
router.put("/:_id", auth, PostController.update);

module.exports = router;
