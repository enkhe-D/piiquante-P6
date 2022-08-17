//IMPORTATION DES PACKAGES
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
//     const userIdDecoded = decodedToken.userId;

//     userIdParamsUrl = req.originalUrl.split("=")[1];

//     console.log("--------userIdParamsUrl--------");
//     console.log(userIdParamsUrl);

//     if (userIdParamsUrl !== userIdDecoded) {
//       throw "userId invalide";
//     } else {
//       next();
//     }
//   } catch (error) {
//     res.status(401).json({ error, message: "Echec Authentification" });
//   }
// };

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    const userId = decodedToken.userId;

    req.auth = { userId };

    if (req.body.userId && req.body.userId !== userId) {
      throw "userId invalide";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error, message: "Echec Authentification" });
  }
};
