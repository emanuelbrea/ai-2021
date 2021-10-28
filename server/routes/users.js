const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')

const usersController = require('../controllers/usersController');

router.post('/signup', usersController.postSignup);

router.post('/login', usersController.checkLogin);

router.patch('/user', usersController.updateUser);

router.get('/user', usersController.getProfile);


module.exports = router;
