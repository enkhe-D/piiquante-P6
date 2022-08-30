//importation des packages
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//Création du schéma de données contenant les champs souhaités pour chaque utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//sécurité pour enregistrer un seul et unique email
userSchema.plugin(uniqueValidator);

// exportation du module pour que les autres fichiers puissent y acceder
module.exports = mongoose.model("User", userSchema);
