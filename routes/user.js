//importation des packages
const express = require("express");

//importation du middleware passwordValidator et emailValidator
const passwordValidator = require("../middleware/password-validator");
const emailValidator = require("../middleware/email-validator");

//importation du controller
const userController = require("../controllers/user");

//fonction Router
const router = express.Router();

//route (endpoint) signup
router.post(
  "/signup",
  emailValidator,
  passwordValidator,
  userController.signup
);

//route (endpoint) login
router.post("/login", userController.login);

// exportation du module pour que les autres fichiers puissent y acceder
module.exports = router;
