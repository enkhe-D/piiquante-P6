//importation des packages
require("dotenv").config();
const bcrypt = require("bcrypt");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

//importation du model User.js
const User = require("../models/User");

//--------Implémentation de la fonction signup pour s'incrire
exports.signup = (req, res, next) => {
  const emailCryptoJs = cryptoJs
    .HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`)
    .toString();

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: emailCryptoJs,
        password: hash,
      });
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

//----------Implémentation de la fonction login pour se connecter
exports.login = (req, res, next) => {
  const emailCryptoJs = cryptoJs
    .HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`)
    .toString();

  User.findOne({ email: emailCryptoJs })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "utilisateur inexistant",
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
            token: jwt.sign({ userId: user._id }, `${process.env.JWT_TOKEN}`, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
