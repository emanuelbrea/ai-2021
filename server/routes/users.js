const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')

const usersController = require('../controllers/usersController');

router.post('/signup', usersController.postSignup);

router.post('/login', usersController.checkLogin);

router.patch('/user',auth.verifyToken, usersController.updateUser);

router.get('/user', auth.verifyToken, usersController.getProfile);

router.post('/forgotPassword',auth.verifyToken, usersController.forgotPassword)

router.post('/verifyCode',auth.verifyToken, usersController.verifyCode)

router.post('/resetPassword',auth.verifyToken, usersController.resetPassword)


module.exports = router;
