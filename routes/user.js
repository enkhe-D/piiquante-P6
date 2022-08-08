const express = require("express");
const password = require("../middleware/password");
const emailValidator = require("../middleware/email-validator")

const {signup, login} = require("../controllers/user");

const router = express.Router();

 router.post("/signup", emailValidator,password, signup);
 router.post("/login",login);

module.exports = router;
