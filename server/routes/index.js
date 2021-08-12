var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/users');
  //res.json(body);
});

module.exports = router;
