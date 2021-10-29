const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')

const controlController = require('../controllers/controlController');

router.post('/control', auth.verifyToken, controlController.createControl);

router.delete('/control', auth.verifyToken, controlController.deleteControl);

router.get('/control', auth.verifyToken, controlController.getControls);

router.put('/control', auth.verifyToken, controlController.editControls);

module.exports = router;
