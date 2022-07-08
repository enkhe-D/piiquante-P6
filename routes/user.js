const express = require("express");

const password = require("../middleware/password");

const userController = require("../controllers/user");

const router = express.Router();

router.post("/signup", password, userController.signup);
router.post("/login", userController.login);

module.exports = router;
