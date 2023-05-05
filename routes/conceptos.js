const express = require("express");
const router = express.Router();
const conceptosController = require("../controllers/conceptos");

const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/", ensureAuth, conceptosController.getConceptos);
router.get("/agregar", ensureAuth, conceptosController.getNuevoConcepto);
router.post("/agregar/", conceptosController.createConcepto);
router.delete("/borrarConcepto", conceptosController.borrarConcepto);


module.exports = router;
