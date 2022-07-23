//IMPORTATION DES PACKAGES
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const result = dotenv.config()

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
//     const userIdDecoded = decodedToken.userId;

//     userIdParams = req.originalUrl.split("=")[1];

//     if (req._body === true) {
//       console.log("---req.body: BODY RAW TRUE");
//       if (req.body.userId === userIdDecoded) {
//         next();
//       } else {
//         throw "ERREUR identification body raw";
//       }
//     } else if (userIdParams === userIdDecoded) {
//       next();
//     } else {
//       throw "ERREUR identification form-data";
//     }
//   } catch (error) {
//     res.status(401).json({ message: "Echec Authentification", error: error });
//   }
// };

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    const userIdDecoded = decodedToken.userId;
    req.auth = {
      userId: userIdDecoded,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
