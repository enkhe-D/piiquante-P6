const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
// const multer = require("../middleware/multer-config");

const saucesCtrl = require("../controllers/sauces");
//const { route } = require("./user");

router.post("/", /* auth, /*multer,*/ saucesCtrl.createSauces);
router.get("/", /*auth,*/ saucesCtrl.readAllSauces);
router.get("/:id", /*auth, */ saucesCtrl.readOneSauce);
router.put("/:id", /*auth, /*multer,*/ saucesCtrl.upDateSauce);
router.delete("/:id", /*auth,*/ saucesCtrl.deleteSauce);

module.exports = router;
