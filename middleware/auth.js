//IMPORTATION DES PACKAGES
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    const userIdDecoded = decodedToken.userId;

    console.log("-----req.originalUrl----------");
    console.log(req.originalUrl);
    userIdParams = req.originalUrl.split("=")[1];
    console.log("---------------------------------------");

    // if (req.body.userId && req.body.userId !== userIdDecoded) {
    //   next();
    // } else {
    //   throw "User Id non valide";
    // }

    if (req._body === true) {
      console.log("---req.body: BODY RAW TRUE");
      if (req.body.userId === userIdDecoded) {
        next();
      } else {
        throw "ERREUR identification body raw";
      }
    } else if (userIdParams === userIdDecoded) {
      next();
    } else {
      throw "ERREUR identification form-data";
    }
  } catch (error) {
    res.status(401).json({ message: "Echec Authentification", error: error });
  }
};

//  req.auth = {
//    userId: userIdDecoded,
//  };
//  next();
