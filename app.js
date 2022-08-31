//importation des packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("./db/db");

//importation des routes
const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");

//creation de l application
const app = express();

//debug
app.use(morgan("dev"));

//gestion des CORS:Cross Origin Resource Sharing
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

//analyse le corp de la requere http
app.use(bodyParser.json());

//creation du middleware + uri
app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// exportation du module pour que les autres fichiers puissent y acceder
module.exports = app;
