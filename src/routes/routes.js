const express = require('express');
const router = express.Router();
const helloController = require('../controllers/helloController');
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const passport = require('passport');

router.get('/test', helloController.getHello);
router.post('/register', registerController.postRegister);
router.post('/login', loginController.postLogin);
router.get('/profil', passport.authenticate('jwt', { session: false }), loginController.getProfil);
module.exports = router; 