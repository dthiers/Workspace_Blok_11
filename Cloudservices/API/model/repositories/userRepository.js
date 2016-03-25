// TODO: database requiren

var userRepository = function(){

  var self = this;

  // Get all users
  self.getAllUsers = function(req, res, next){
    // TODO: get all users by id
    //console.log(req.db.models);
    // var UserModel = require('../schemas/user');
    //
    // var newUser = new UserModel({
    //   firstname: 'Firstname',
    //   surname: 'Lastname',
    //   email: 'Email',
    //   password: 'Password'
    // })
    //
    // console.log(newUser);

    res.json("userRpo");
  }

  self.addUser = function(req, res, next){
    next();
  }
}

module.exports = userRepository;
