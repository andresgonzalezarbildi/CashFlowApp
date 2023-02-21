const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settings");

const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/settings", ensureAuth, settingsController.getSettings);

module.exports = router;
