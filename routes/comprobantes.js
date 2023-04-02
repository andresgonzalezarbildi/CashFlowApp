const express = require("express");
const router = express.Router();
const comprobantesContoller = require("../controllers/comprobantes");

const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, comprobantesContoller.getComprobantes);
router.get("/agregar", ensureAuth, comprobantesContoller.getNuevoComprobante);
router.post("/agregar/", comprobantesContoller.createComprobante);
router.delete("/borrarComprobante", comprobantesContoller.borrarComprobante);

module.exports = router;
