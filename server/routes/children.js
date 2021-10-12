const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')

const childrenController = require('../controllers/childrenController');

//TODO add authentication method
router.post('/children', childrenController.createChildren);

router.delete('/children', childrenController.deleteChildren);

router.get('/children', childrenController.getChildren);

router.put('/children', childrenController.editChildren);

module.exports = router;
