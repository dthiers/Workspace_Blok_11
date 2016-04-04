module.exports = function(mongoose) {
  var User = mongoose.model('User');
  var self = this;

  self.sendSomething = function(req, res, next){
    res.render('index');
  }

  self.renderIndex = function(req, res, next){
    res.render('index');
  }
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
    var newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password
    })
    newUser.save(function(err, user, rowsAffected){
      if(err) { console.log('user wasnt save'); return next(err);}
      console.log('affected rows: ' + rowsAffected);
      console.log('User added: ' + user);
      res.redirect('/profile');
    });

  }

  self.logout = function(req, res, next){
    req.logout();
    res.redirect('/');
  }
}
