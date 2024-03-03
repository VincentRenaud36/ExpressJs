const express = require('express');
const router = express.Router();
const helloController = require('../controllers/helloController');
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const passport = require('passport');
const fileController = require('../controllers/fileController');
const banList = require('../middleware/banList');
const userController = require('../controllers/userController');
const profilController = require('../controllers/profilController');

router.get('/test', helloController.getHello);
router.post('/register', registerController.postRegister);
router.post('/login', loginController.loginUser);
router.get('/profil', passport.authenticate('jwt-verify', { session: false }), banList, profilController.getProfil);
router.post('/add-file', passport.authenticate('jwt-verify', { session: false }), banList, fileController.postFile);

const isAdmin =(req, res, next) => {
    if(req.user.isAdmin){
        next();
    }else{
        res.status(403).send('Vous n\'êtes pas admin');
    }
};

router.delete('/rm/:userId', passport.authenticate('jwt-verify', { session: false }), banList, isAdmin, userController.deleteUser);

router.get('/list', passport.authenticate('jwt-verify', { session: false }), banList, isAdmin, userController.getUsers);

router.put('/ban/:userId', passport.authenticate('jwt-verify', { session: false }), banList, isAdmin, userController.banUser);

router.put('/up/:userId', passport.authenticate('jwt-verify', { session: false }), banList, isAdmin, userController.makeAdmin);

router.put('/down/:userId', passport.authenticate('jwt-verify', { session: false }), banList, isAdmin, userController.removeAdmin);
module.exports = router; 