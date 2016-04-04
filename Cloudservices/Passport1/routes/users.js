var express = require('express');
var router = express.Router();


module.exports = function(userRepo, passport) {
    router.route('/')
      .get(userRepo.getAllUsers)
      .post(userRepo.addUser);

    router.route('/:id')
      .get(userRepo.getUserById);


    return router;
};
