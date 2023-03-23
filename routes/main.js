const express = require('express')
const router = express.Router()
const mainController = require('../controllers/main') 
const comprobantesController = require("../controllers/comprobantes"); 
const authController = require("../controllers/auth");

const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, mainController.getMain)

//  LOGIN
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

router.get("/comprobantes", ensureAuth, comprobantesController.getComprobantes);


module.exports = router