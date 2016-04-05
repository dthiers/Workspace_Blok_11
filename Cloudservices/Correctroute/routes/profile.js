var express = require('express');
var router = express.Router();

module.exports = function(){
  console.log('im at profile');
  router.route('/')
    .get(function(req, res, next) {
      res.render('profile', { user: req.user });
    });

  return router;
}
