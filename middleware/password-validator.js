//importation des packages
const passwordValidator = require("password-validator");

//création du schema
const passwordSchema = new passwordValidator();

//le schema que doit respecter le mot de passe
passwordSchema
  .is()
  .min(5)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

//exportation du module
module.exports = (req, res, next) => {
  //verification de password par rapport au schema defini
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res.status(400).json({
      error: `Le mot de passe n est pas assez fort ${passwordSchema.validate(
        "req.body.password",
        { list: true }
      )}`,
    });
  }
};
