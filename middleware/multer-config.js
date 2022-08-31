//importation des packages
const multer = require("multer");

//dictionnaire de MIME TYPES
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

//destination pour le stokage de fichier et génération d'un nom de fichier unique
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];

    callback(null, `${name}_${Date.now()}.${extension}`);
  },
});

// exportation du module pour que les autres fichiers puissent y acceder
module.exports = multer({ storage }).single("image");
