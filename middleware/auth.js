const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
//const result = dotenv.config();

module.exports = (req, res, next) => {
  try {
    console.log("----> MIDDLEWARE: auth");

    const token = req.headers.authorization.split(" ")[1];
    // console.log("---------token--------------");
    // console.log(token);

    // console.log("-----------req avant ctrl token----------------");
    // console.log(req);

    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    console.log("--------decodedToken------------");
    console.log(decodedToken);

    const userIdDecoded = decodedToken.userId;
    console.log("------userIdDecoded------------");
    console.log(userIdDecoded);

    console.log("-----CONTENU: req.body-------------------");
    console.log(req.body);

    console.log("-----CONTENU: req.body.userId------------------");
    console.log(req.body.userId);

    console.log("---------req.originalUrl------------------");
    console.log(req.originalUrl);

    console.log("---------userIdParamsUrl------------------");
    userIdParamsUrl = req.originalUrl.split("=")[1];
    console.log(userIdParamsUrl);

    if (req._body === true) {
      console.log("-------req.body: TRUE");
      if (req.body.userId === userIdDecoded) {
        next();
      } else {
        console.log("----ERREUR AUTH body raw------------");
        throw "ERREUR identification userId";
      }
    } else if (userIdParamsUrl === userIdDecoded) {
      next();
    } else {
      throw "ERREUR identification url form-data";
    }
  } catch (error) {
    res.status(401).json({ message: "Echec Authentification", error: error });
  }
};
