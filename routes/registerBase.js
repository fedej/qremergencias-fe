var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registerBase', { title: 'QR Emergencias' });
});

module.exports = router;
