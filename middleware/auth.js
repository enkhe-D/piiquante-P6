//IMPORTATION DES PACKAGES
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    const userId= decodedToken.userId;
    if(req.body.userId && (req.body.userId !== userId)){
      throw 'Utilisateur non valide';
    }else{
      next();
    }
    
  } catch (error) {
    res.status(401).json({ error, message: "Token d'authentification invalide"});
  }
};

