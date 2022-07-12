const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cryptoJs = require("crypto-js");

const dotenv = require("dotenv");
const result = dotenv.config();

const User = require("../models/User");

/////////CONTROLER SIGNUP

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
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((error) =>
          res.status(400).json({ error }).send(console.log(error))
        );
    })
    .catch((error) => res.status(500).json({ error }).send(console.log(error)));
};

/////////CONTROLER LOGIN
exports.login = (req, res, next) => {
  const emailCryptoJs = cryptoJs
    .HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`)
    .toString();

  User.findOne({ email: emailCryptoJs })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur introuvable" });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Authentification incorrecte" });
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
