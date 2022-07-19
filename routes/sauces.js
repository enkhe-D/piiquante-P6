const express = require("express");
const router = express.Router();

/*-------------------MIDDLEWARE--------------------*/
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

/*--------------------CONTROLLER-------------------*/
const saucesCtrl = require("../controllers/sauces");
const optionSauceCtrl = require("../controllers/option-sauce");

/*----------------------ROUTES---------------------*/
//POST ----- CREATE ----- CRÉATION
router.post("/", auth, multer, saucesCtrl.createSauces);
router.post("/:id/like", auth, optionSauceCtrl.userLike);

//GET ----- READ ----- AFFICHAGE
router.get("/", auth, saucesCtrl.readAllSauces);
router.get("/:id", auth, saucesCtrl.readOneSauce);

//PUT ----- UPDATE ----- MODIFIER
router.put("/:id", auth, multer, saucesCtrl.upDateOneSauce);

//DELETE ----- DELETE ----- SUPPRIMER
router.delete("/:id", auth, saucesCtrl.deleteOneSauce);

module.exports = router;
