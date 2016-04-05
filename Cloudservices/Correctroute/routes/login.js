var express = require('express');
var router = express.Router();

module.exports = function(repository, passport){

  router.route('/')
    .get(repository.renderLogin);

  router.post('/', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
    session: true
  }))

  return router;

}
