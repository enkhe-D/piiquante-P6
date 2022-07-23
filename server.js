const http = require("http");

//importation de l appli express
const app = require("./app");

//package pour utiliser les variables d environnement
const dotenv = require("dotenv")
const result = dotenv.config()
//console.log(process.env);

//parametrage du server avec methode set express
app.set("port", process.env.PORT);

//fonction(app) appeler pour chaque requete recu par le serveur
const server = http.createServer(app);

//le serveur ecoute les requetes sur le port
server.listen(process.env.PORT);

// const http = require("http");

// //importation de l appli express
// const app = require("./app");

// //package pour utiliser les variables d environnement
// require("dotenv").config();
// //console.log(process.env);

// const normalizePort = (val) => {
//   const port = parseInt(val, 10);

//   if (isNaN(port)) {
//     return val;
//   }
//   if (port >= 0) {
//     return port;
//   }
//   return false;
// };

// const port = normalizePort(process.env.PORT || "3000");
// //parametrage du server avec methode set express
// app.set("port", port);

// const errorHandler = (error) => {
//   if (error.syscall !== "listen") {
//     throw error;
//   }

//   const address = server.address();
//   const bind =
//     typeof address === "string" ? "pipe " + address : "port: " + port;
//   switch (error.code) {
//     case "EACCES":
//       console.error(bind + " requires elevated privileges.");
//       process.exit(1);
//       break;
//     case "EADDRINUSE":
//       console.error(bind + "is already in use.");
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// };

// //fonction(app) appeler pour chaque requete recu par le serveur
// const server = http.createServer(app);

// server.on("error", errorHandler);
// server.on("listening", () => {
//   const address = server.address();
//   const bind = typeof address == "string" ? "pipe " + address : "port: " + port;
//   console.log("Listening on " + bind);
// });

// //le serveur ecoute les requetes sur le port
// server.listen(process.env.PORT);

