const express = require("express");

/*-------------------MIDDLEWARE--------------------*/
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

/*--------------------CONTROLLER-------------------*/
const saucesCtrl = require("../controllers/sauces");
const optionSauceCtrl = require("../controllers/option-sauce");

/*----------------------ROUTES---------------------*/
const router = express.Router();

//POST ----- CREATE ----- CRÉATION
router.post("/", auth, multer, saucesCtrl.createSauces);
router.post("/:id/like", auth, optionSauceCtrl.userLike);

//GET ----- READ ----- AFFICHAGE
router.get("/", auth, saucesCtrl.readAllSauces);
router.get("/:id", auth, saucesCtrl.readOneSauce);

//PUT ----- UPDATE ----- MODIFICATION/MISE A JOUR
router.put("/:id", auth, multer, saucesCtrl.updateOneSauce);

//DELETE ----- DELETE ----- SUPPRESSION 
router.delete("/:id", auth, saucesCtrl.deleteOneSauce);

module.exports = router;
