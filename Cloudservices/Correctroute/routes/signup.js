var express = require('express');
var router = express.Router();

module.exports = function(repository){

  router.route('/')
    .get(repository.renderSignup)
    .post(repository.signupUser);

  return router;
}
