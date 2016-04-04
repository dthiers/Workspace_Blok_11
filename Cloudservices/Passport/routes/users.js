var express = require('express');
var router = express.Router();

/*
======== USER ENTITIES ===========
- _id             (objectId from Mongo)
- firstname       (contains a-zA-Z, no special chars.)
- surname         (contains a-zA-Z, no special chars.)
- surnamePrefix   (De, Van, Von, etc)(contains a-zA-Z, no special chars.)
- email           (email format)
- password        (special rules. Hashed, but how?)
-
**/

module.exports = function(userRepo) {
    router.route('/')
      .get(userRepo.getAllUsers)
      .post(userRepo.addUser);

    router.route('/:id')
      .get(userRepo.getUserById);


    return router;
};





// router.route('/:id')
//   .get(userRepo.getUserById)
//   .put(userRepo.updateUserById);





// // PARAMS method that is only called once
// router.param('id', function(req, res, next, value) {
//   // Hier kan je eenmalig een user ophalen en die vervolgens op het req object zetten.
//   req.value = value;
//   next()
// })
//
// /* GET users listing. */
// router.get('/', mw, function(req, res) {
//   // schema
//   res.send('users' + ' - message: ' + req.messages.msg);
// });
//
// router.get('/:id', function(req, res) {
//   console.log('ik ben in de users');
//   res.send('users/' + req.value);
// })
//
// router.get('/:id/test', function(req, res){
//   res.send('users/' + req.value + '/test');
// })
//
// // Chainable routes
// router.route('/test').get(function(res, req) {
//   res.send('/users/test');
// }).post(function(res, req) {
//   req.send('/users/test');
// })
