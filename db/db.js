const mongoose = require("mongoose");
const dotenv = require("dotenv")
const result = dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion a MongoDB: connecté"))
  .catch(() => console.log("Connexion a MongoDB: échoué!"));

module.exports = mongoose;