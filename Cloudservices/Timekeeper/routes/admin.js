var express = require('express');
var router = express.Router();

module.exports = function(repositories){

  var userRepo = repositories.user;

  router.get('/', function(req, res){
    // TODO: render the admin page
    if(req.isAuthenticated()) { res.send('admin page') }
    else { res.redirect('/login') }
  })

  router.route('/users')
    .get(userRepo.getAllUsers)
    .post()
    .put()
    .delete();

  return router;
}
