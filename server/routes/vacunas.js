const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')

const vacunasController = require('../controllers/vacunasController');

//TODO add authentication method
router.get('/vacuna', vacunasController.getVacunas);

router.post('/vacuna', vacunasController.createVacuna);

router.put('/vacuna', vacunasController.editVacuna);

router.delete('/vacuna', vacunasController.deleteVacuna);

module.exports = router;
