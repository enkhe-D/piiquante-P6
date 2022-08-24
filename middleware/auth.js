//IMPORTATION DES PACKAGES
const jwt = require("jsonwebtoken");
require("dotenv").config();

// module.exports = (req, res, next) => {
//   try {
//     //récuperation du token dans le headers authorization
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
//     const userId = decodedToken.userId;

//     // console.log("-----userId--------");
//     // console.log(userId);

//     // req.auth = { userId };

//     // console.log("-----req.auth--------");
//     // console.log(req.auth);

//     // console.log("-----req.body--------");
//     // console.log(req.body);

//     // console.log("-----req.body.userId--------");
//     // console.log(req.body.userId);

//     userIdParamsUrl = req.originalUrl.split("=")[1];

//     if (req._body === true) {
//       //contole quand ca passe par le BODY RAW
//       console.log("req._body: true-----------");
//       if (req.body.userId === userId) {
//         next();
//       } else {
//         console.log("---ERREUR auth BODY RAW--------");
//         throw "erreur identification userId body raw";
//       }
//       //   //controle quand ca passe par form-data
//       // } else if (userIdParamsUrl === userId) {
//       //   next();
//       // } else {
//       //   console.log("---ERREUR auth FORM-DATA--------");
//       //   throw "erreur identification userId form-data";
//     }
//   } catch (error) {
//     res.status(401).json({ error, message: "token invalide" });
//   }
// };

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);

    const userId = decodedToken.userId;

    req.auth = { userId };

    if (req.body.userId && req.body.userId !== userId) {
      throw "identifiant invalide!";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: new Error("token invalid!") });
  }
};
