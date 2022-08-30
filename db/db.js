//importation des packages
const mongoose = require("mongoose");
require("dotenv").config();

//connexion de l API a la base de donnée + creation des variables d env
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion a MongoDB: réussi! ;)"))
  .catch(() => console.log("Connexion a MongoDB: échoué!"));

// exportation du module pour que les autres fichiers puissent y acceder
module.exports = mongoose;
