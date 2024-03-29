const express = require("express");
const router = express.Router();
const cuentasController = require("../controllers/cuentas");

const { ensureAuth } = require("../middleware/auth");


router.get("/", ensureAuth, cuentasController.getCuentas);
router.get("/agregar", ensureAuth, cuentasController.getNuevaCuenta);
router.post("/agregar/", cuentasController.createCuenta);
router.get("/editar", ensureAuth, cuentasController.getEditarCuenta);
router.post("/editar/:cuentaId", cuentasController.editarCuenta);
router.delete("/borrarCuenta", cuentasController.borrarCuenta);




module.exports = router;
