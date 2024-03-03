const express = require('express');
const router = express.Router();
const helloController = require('../controllers/helloController');
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const passport = require('passport');
const fileController = require('../controllers/fileController');
const banList = require('../middleware/banList');
const userController = require('../controllers/userController');

router.get('/test', helloController.getHello);
router.post('/register', registerController.postRegister);
router.post('/login', loginController.postLogin);
router.get('/profil', passport.authenticate('jwt', { session: false }), banList, loginController.getProfil);
router.post('/add-file', passport.authenticate('jwt', { session: false }), banList, fileController.postFile, fileController.postFileHandler);

const isAdmin =(req, res, next) => {
    if(req.user.isAdmin){
        next();
    }else{
        res.status(403).send('Vous n\'êtes pas admin');
    }
};

router.delete('/users/rm', passport.authenticate('jwt', { session: false }), banList, isAdmin, userController.deleteUser);

router.get('/list', passport.authenticate('jwt', { session: false }), banList, isAdmin, userController.getUsers);

router.put('/users/ban', passport.authenticate('jwt', { session: false }), banList, isAdmin, userController.banUser);

router.put('/user/up', passport.authenticate('jwt', { session: false }), banList, isAdmin, userController.makeAdmin);

router.put('/user/down', passport.authenticate('jwt', { session: false }), banList, isAdmin, userController.removeAdmin);
module.exports = router; 