var express = require('express');
var router = express.Router();

module.exports = function(passport){

  router.route('/')
    .get(function(req, res) { res.render('login') });

  router.post('/', passport.authenticate('local'), function(req, res) {
    res.json(req.user);
  });

  router.post('/jwt', passport.authenticate('jwt'), function(req, res) {
    res.json('test');
  })


  return router;

}
