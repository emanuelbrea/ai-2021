const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')

const controlController = require('../controllers/controlController');

router.post('/control', controlController.createControl);

router.delete('/control', controlController.deleteControl);

router.get('/control', controlController.getControls);

router.put('/control', controlController.editControls);

module.exports = router;
