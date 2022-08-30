//importation des packages
const express = require("express");

//fonction Router
const router = express.Router();

// importation des middelewares
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//importation des contollers
const saucesCtrl = require("../controllers/sauces");
const optionSauceCtrl = require("../controllers/option-sauce");

//routes
router.post("/", auth, multer, saucesCtrl.createSauce);
router.post("/:id/like", auth, optionSauceCtrl.userLike);
router.get("/", auth, saucesCtrl.getAllSauces);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.put("/:id", auth, multer, saucesCtrl.updateSauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);

// exportation du module pour que les autres fichiers puissent y acceder
module.exports = router;
