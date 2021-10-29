const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')

const childrenController = require('../controllers/childrenController');

router.post('/children',auth.verifyToken, childrenController.createChildren);

router.delete('/children',auth.verifyToken, childrenController.deleteChildren);

router.get('/children',auth.verifyToken, childrenController.getChildren);

router.put('/children',auth.verifyToken, childrenController.editChildren);

module.exports = router;
