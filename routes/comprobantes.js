const express = require("express");
const router = express.Router();
const comprobantesController = require("../controllers/comprobantes");

const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/", ensureAuth, comprobantesController.getComprobantes);
router.post("/", comprobantesController.createComprobante);


module.exports = router;
