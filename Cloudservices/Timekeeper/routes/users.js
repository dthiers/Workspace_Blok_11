var express = require('express');
var router = express.Router();

module.exports = function(userRepo){

  // TODO: route the routes via the repo
  router.route('/')
    .get(userRepo.getAllUsers);


  return router;
}
