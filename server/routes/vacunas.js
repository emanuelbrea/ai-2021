const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')

const vacunasController = require('../controllers/vacunasController');

router.get('/vacuna', auth.verifyToken, vacunasController.getVacunas);

router.post('/vacuna', auth.verifyToken, vacunasController.createVacuna);

router.put('/vacuna', auth.verifyToken, vacunasController.editVacuna);

router.delete('/vacuna', auth.verifyToken, vacunasController.deleteVacuna);

module.exports = router;
