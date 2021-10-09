const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')

const childrenController = require('../controllers/childrenController');

router.post('/children', childrenController.createChildren);

router.delete('/children', childrenController.deleteChildren);

module.exports = router;
