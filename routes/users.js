const express = require("express");
const { verify } = require("jsonwebtoken");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authen } = require("../middleware/tokenValidation");

router.get("/", UserController.getAll);
router.post("/", UserController.create);
router.post("/login", UserController.login);
router.put("/logout", authen, UserController.logout);
router.get("/confirm/:emailToken", UserController.confirm);

module.exports = router;
