
var userRepository = function(mongoose){
  var User = mongoose.model('User');
  //console.log("========== " + model);

  var self = this;

  // Get all users
  self.getAllUsers = function(req, res, next){
    console.log('Kom ik hier dan?');
    res.json('test');
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
}

module.exports = userRepository;
