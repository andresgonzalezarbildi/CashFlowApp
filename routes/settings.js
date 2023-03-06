const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settings");  

const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/", ensureAuth, settingsController.getProveedores);
router.post("/", settingsController.createProveedor);
router.delete("/", settingsController.deleteProveedor);


module.exports = router;
