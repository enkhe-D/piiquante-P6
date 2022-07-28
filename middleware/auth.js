//IMPORTATION DES PACKAGES
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    const userIdDecoded = decodedToken.userId;
    req.auth = {
      userId: userIdDecoded,
    };
    console.log("-----req.auth----------");
    console.log(req.auth);
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
