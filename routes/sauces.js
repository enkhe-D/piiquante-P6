const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const saucesCtrl = require("../controllers/sauces");
const optionSauceCtrl = require("../controllers/option-sauce");

router.post("/", auth, multer, saucesCtrl.createSauce);
router.post("/:id/like", auth, optionSauceCtrl.userLike);
router.get("/", auth, saucesCtrl.getAllSauces);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.put("/:id", auth, multer, saucesCtrl.updateSauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);

module.exports = router;
