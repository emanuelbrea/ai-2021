const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')

const childrenDataController = require('../controllers/childrenDataController');

router.get('/childrenData',auth.verifyToken, childrenDataController.getChildrenData);

router.post('/childrenData',auth.verifyToken, childrenDataController.createChildrenData);

router.put('/childrenData',auth.verifyToken, childrenDataController.editChildrenData);

router.delete('/childrenData',auth.verifyToken, childrenDataController.deleteChildrenData);

module.exports = router;
