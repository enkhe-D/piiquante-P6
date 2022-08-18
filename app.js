//importation package
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

//importation connexion bd
const mongoose = require("./db/db");

//importation routes
const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");

//pour créer une application express
const app = express();

//journal des requests et de responses
app.use(morgan("dev"));

//debug mongoose
console.log("------debug logger mongoose------------");
mongoose.set("debug", true);

//gestion des problèmes de CORS (Cross-Origin Request Sharing)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

//transform le coprs (body) en objet json exploitable
app.use(bodyParser.json());

//route d authentification
app.use("/api/auth", userRoutes);

//route général
app.use("/api/sauces", saucesRoutes);

//chemain pour les fichiers images
app.use("/images", express.static(path.join(__dirname, "images")));

//exportation de app.js
module.exports = app;
