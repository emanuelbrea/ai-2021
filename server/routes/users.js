var express = require('express');
var router = express.Router();

var usersController = require('../controllers/usersController');

router.post('/signup', usersController.postSignup);

module.exports = router;
