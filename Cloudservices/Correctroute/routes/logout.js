var express = require('express');
var router = express.Router();

module.exports = function(){
  
  router.route('/')
    .get(function(req, res, next) {
      console.log(req.isAuthenticated());
      req.logout();
      console.log(req.isAuthenticated());
      res.render('login');
    });

  return router;

}
