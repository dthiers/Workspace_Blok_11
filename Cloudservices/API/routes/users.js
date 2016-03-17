// var express = require('express');
// var router = express.Router();

// Include baseRouter
var router = require('./baseRouter.js');

// PARAMS method that is only called once
router.param('id', function(req, res, next, value) {
  // Hier kan je eenmalig een user ophalen en die vervolgens op het req object zetten.
  req.value = value;
  next()
})



/* GET users listing. */
router.get('/', function(req, res, next) {
  // schema
  res.send('users' + ' - message: ' + res.return());
});

router.get('/:id', function(req, res, next) {
  res.send('users/' + req.value);
})

router.get('/:id/test', function(req, res){
  res.send('users/' + req.value + '/test');
})

// Chainable routes
router.route('/test').get(function(res, req, next) {
  res.send('/users/test');
}).post(function(res, req, next) {
  req.send('/users/test');
})

module.exports = router;
