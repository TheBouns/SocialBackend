const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const { authen } = require("../middleware/tokenValidation");

router.get("/", PostController.find);
router.post("/", authen, PostController.create);
router.get("/:name", authen, PostController.findByName);

module.exports = router;
