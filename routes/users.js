const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authorization = require("../middleware/tokenValidation");

router.get("/", authorization, UserController.getAll);
router.post("/", authorization, UserController.create);
router.post("/login", UserController.login);
// router.put("/logout", UserController.logout);

module.exports = router;
