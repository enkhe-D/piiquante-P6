//importation package mongoose
const mongoose = require("mongoose");

//importation package mongoose-unique-validator
const uniqueValidator = require("mongoose-unique-validator");

//schema pour le signup
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//sécurité pour enregistrer un seul et unique utilisateur(email)
userSchema.plugin(uniqueValidator);

//exportation du module
module.exports = mongoose.model("User", userSchema);
