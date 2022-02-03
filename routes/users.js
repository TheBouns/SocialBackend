const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { auth, Admin } = require("../middleware/tokenValidation");

router.get("/", auth, Admin, UserController.getAll);
router.get("/:name", UserController.findbyName);
router.get("/id/:_id", auth, UserController.findById);
router.get("/confirm/:emailToken", UserController.confirm);
router.post("/", UserController.create);
router.post("/login", UserController.login);
router.put("/follow/:_id", auth, UserController.follow);
router.put("/logout", auth, UserController.logout);

module.exports = router;
