const express = require("express");
const router = express.Router();
const cuentasController = require("../controllers/cuentas");

const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/", ensureAuth, cuentasController.getCuentas);
router.get("/:id", ensureAuth, cuentasController.getCuenta)
router.post("/", cuentasController.createCuenta);


module.exports = router;
