const express = require("express");

//MIDDLEWARE
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//CONTROLLER
const saucesCtrl = require("../controllers/sauces");
const optionSauceCtrl = require("../controllers/option-sauce");

//fonction Router()
const router = express.Router();

//POST ----- CREATE ----- CRÉATION
router.post("/", auth, /* multer,*/ saucesCtrl.createSauce);
router.post("/:id/like", auth, optionSauceCtrl.userLike);

//GET ----- READ ----- AFFICHAGE
router.get("/", auth, saucesCtrl.getAllSauces);
router.get("/:id", auth, saucesCtrl.getOneSauce);

//PUT ----- UPDATE ----- MODIFICATION/MISE A JOUR
router.put("/:id", auth, /*multer,*/ saucesCtrl.updateSauce);

//DELETE ----- DELETE ----- SUPPRESSION
router.delete("/:id", auth, saucesCtrl.deleteSauce);

module.exports = router;
