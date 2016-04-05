module.exports = function(mongoose) {
  var User = mongoose.model('User');
  var Role = mongoose.model('Role');
  var self = this;

  // self.renderIndex = function(req, res, next){
  //   console.log('ik kom bij de renderIndex');
  //   if(!req.isAuthenticated()) { return next()}
  //   res.render('login');
  //   //res.render('index');
  // }
  self.renderLogin = function(req, res, next){
    res.render('login', { message: req.flash('loginMessage') });
  }
  self.renderProfile = function(req, res, next){
    res.render('profile', {
      user: req.user
    })
  }
  self.renderSignup = function(req, res, next){
    res.render('signup', { message: req.flash('signupMessage') });
  }

  self.signupUser = function(req, res, next){
    console.log(req.body);
    if(!req.body.username || !req.body.password){
      res.send({ success: false, message: "No username or password" })
    }

    var newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.isAdmin ? req.body.isAdmin : false
    })
    newUser.save(function(err){
      if(err) {
        console.log('user wasnt saved'); return next(err);
      }
      else {
        res.send({ success: true, message: "successfully added user" })
      }
    });

  }

  self.logout = function(req, res, next){
    req.logout();
    res.redirect('/');
  }
}
