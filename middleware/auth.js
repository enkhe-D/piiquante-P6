//omportation des packages
const jwt = require("jsonwebtoken");
require("dotenv").config();

//exportation de la fonction du middleware
module.exports = (req, res, next) => {
  try {
    //récupération du token dans le headers authorization
    const token = req.headers.authorization.split(" ")[1];

    //decoder le token
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);

    //récupération de l userId dans le token
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
