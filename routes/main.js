const express = require('express')
const router = express.Router()
const mainController = require('../controllers/main') 
const comprobantesController = require("../controllers/comprobantes"); 

const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, mainController.getMain)
router.get("/comprobantes", ensureAuth, comprobantesController.getComprobantes);


module.exports = router