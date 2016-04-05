var jwt = require('jwt-simple');
var config = require('../../config');

var userRepository = function(mongoose){
  var User = mongoose.model('User');
  //console.log("========== " + model);

  var self = this;

  // Get all users
  self.getAllUsers = function(req, res, next){
    console.log('Kom ik hier dan?');
    res.render('index');
    //res.json('testje');
  }

  // Get user by id
  self.getUserById = function(req, res, next){
    User.find({ _id: req.params.id }).exec(function(err, user) {
      if(err) { return next(err)}
      res.send(JSON.stringify(user));
    });
  }

  // Add new user
  self.addUser = function(req, res, next){
    var newUser = new User({firstname: req.body.firstname, lastname: req.body.lastname});

    newUser.save(function(err) {
      if (err) { console.log(err)}
      res.send(200);
    })
  }


  // Authenticate a user
  self.authenticateUser = function(req, res, next){
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if(err) { return next(err); }
      if(!user) {
         res.return(404, "user not found")
       }
       else {
         user.validPassword(req.body.password, function(err, isMatch) {
           if(!err && isMatch){
             // TODO: delete password + _id
             var token = jwt.encode(user, config.secret.secret);
             // Return token to user
             res.send({ success: true, token: 'JWT ' + token });
           }
           else {
             res.return(400, "Wrong password");
           }
         })
       }

    })
  }
}

module.exports = userRepository;
