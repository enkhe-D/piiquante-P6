const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    const userId = decodedToken.userId;
    if (req.body.sauces.userId && req.body.sauces.userId === userId) {
      next();
    } else {
      throw "non valide";
    }
    // req.auth = {
    //   userId: userId,
    // };
  } catch (error) {
    res.status(401).json({ error });
  }
};
