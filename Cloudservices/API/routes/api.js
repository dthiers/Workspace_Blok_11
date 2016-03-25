var express = require('express');
var router = express.Router();

var mw = require('../modules/basicMiddleware');

// Get API
router.get('/', function(req, res){
  console.log('ik kom langs de API route');
  res.send('Test of de api hier komt zonder authentication');
});

router.get('/:id', mw, function(req, res) {
  res.send('Ik heb een paramater meegekregen: ' + JSON.stringify(req.params));
})

module.exports = router;
