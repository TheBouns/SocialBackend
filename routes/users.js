const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { auth } = require("../middleware/tokenValidation");

router.get("/", auth, UserController.getAll);
router.post("/", UserController.create);
router.post("/login", UserController.login);
router.put("/logout", auth, UserController.logout);
router.get("/confirm/:emailToken", UserController.confirm);

module.exports = router;
