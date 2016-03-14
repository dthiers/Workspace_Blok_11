var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', test: 'testje' });
});

module.exports = router;


var users = [
  {"username":"Dion Thiers", "email":"dionthiers@gmail.com"},
  {"username":"Fahiem Karsodimedjo", "email":"fskarsod@student.avans.nl"},
  {"username":"Raymond Phua", "email":"r.phua@student.avans.nl"}
]
