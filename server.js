const http = require("http");

//importation de l appli express
const app = require("./app");

//package pour utiliser les variables d environnement
const dotenv = require("dotenv");
const result = dotenv.config();

//parametrage du server avec methode set express
app.set("port", process.env.PORT);

//fonction(app) appeler pour chaque requete recu par le serveur
const server = http.createServer(app);

//le serveur ecoute les requetes sur le port
server.listen(process.env.PORT);
