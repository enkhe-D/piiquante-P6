//importation des packages

require("dotenv").config();
const bcrypt = require("bcrypt");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//--------CONTROLER SIGNUP pour enregistrer une nouvel utilisateur
exports.signup = (req, res, next) => {
  // //chiffrement de l email
  // const emailCryptoJs = cryptoJs
  //   .HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`)
  //   .toString();

  //hashage du mot de passe
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email /*emailCryptoJs*/,
        password: hash,
      });

      //envoie a la base de donnée
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "Utilisateur créé et sauvgardé" })
        )
        .catch((error) =>
          res.status(400).json({ error, message: "Autentification incorrecte" })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};

//----------CONTROLER LOGIN
exports.login = (req, res, next) => {
  // const emailCryptoJs = cryptoJs
  //   .HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`)
  //   .toString();

  //chercher dans la bd si le email de l utilisateur est present
  User.findOne({ email: req.body.email /*emailCryptoJs*/ })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "utilisateur introuvable",
        });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ error: "Mot de passe et/ou email incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
