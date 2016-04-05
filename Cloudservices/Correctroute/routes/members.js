var express = require('express');
var router = express.Router();

module.exports = function(mongoose, passport){

  router.get('/', passport.isAuth, function(req, res, next) {

    res.send('member');
  })


  return router;
}
