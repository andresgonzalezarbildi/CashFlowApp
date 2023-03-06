const express = require("express");
const router = express.Router();
const comprobantesRoutes = require("../controllers/comprobantes");

const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/", ensureAuth, comprobantesRoutes.getComprobantes);
router.post("/", comprobantesRoutes.createComprobante);


module.exports = router;
