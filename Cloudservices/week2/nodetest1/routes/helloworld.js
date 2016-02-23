var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next){
  res.render('helloworld', { helloworld: "Hellow World!"});
});

module.exports = router;
