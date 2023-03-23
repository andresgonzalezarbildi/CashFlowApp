const express = require("express");
const router = express.Router();
const conceptosController = require("../controllers/conceptos");

const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/", ensureAuth, conceptosController.getConceptos);
router.post("/", conceptosController.createConcepto);


module.exports = router;
