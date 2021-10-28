const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')

const childrenDataController = require('../controllers/childrenDataController');

//TODO add authentication method
router.get('/childrenData', childrenDataController.getChildrenData);

router.post('/childrenData', childrenDataController.createChildrenData);

router.put('/childrenData', childrenDataController.editChildrenData);

router.delete('/childrenData', childrenDataController.deleteChildrenData);

module.exports = router;
