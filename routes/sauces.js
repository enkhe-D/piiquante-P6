const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const saucesCtrl = require("../controllers/sauces");

router.get("/", auth, saucesCtrl.readAllSauces);
router.post("/", auth, multer, saucesCtrl.createSauce);
router.get("sauce/:id", auth, saucesCtrl.readOneSauce);
router.put("/:id", auth, multer, saucesCtrl.upDateOneSauce);
router.delete("/:id", auth, saucesCtrl.deleteOneSauce);

module.exports = router;
