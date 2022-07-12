const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
//const result = dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    const userIdDecoded = decodedToken.userId;
    req.auth = {
      userId: userIdDecoded,
    };
    next();

    // userIdParamsUrl = req.originalUrl.split("=")[1];
    // console.log(userIdParamsUrl);

    // if (req._body === true) {
    //   if (req.body.userId === userIdDecoded) {
    //     next();
    //   } else {
    //     throw "ERREUR identification userId";
    //   }
    // } else if (userIdParamsUrl === userIdDecoded) {
    //   next();
    // } else {
    //   throw "ERREUR identification url form-data";
    // }
  } catch (error) {
    res.status(401).json({ message: "Echec Authentification", error: error });
  }
};
