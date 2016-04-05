var express = require('express');
var router = express.Router();

module.exports = function(app, repository, passport){
  var self = this;
  router.route('/')
    .get(repository.renderIndex);

  router.route('/login')
    .get(repository.renderLogin);

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
    session: true
  }))

  router.route('/signup')
    .get(repository.renderSignup)
    .post(repository.signupUser);


  //router.use('/profile', isLoggedIn);
  //router.route('/profile')
  //  .get(repository.renderProfile);
  router.get('/profile', isLoggedIn, repository.renderProfile);

  router.route('/logout')
    .get(repository.logout);

  return router;
}

var isLoggedIn = function(req, res, next){
  //req.isAuthenticated = function(){return false;};
  if(req.isAuthenticated()) { return next(); }
  res.redirect('/');
}
