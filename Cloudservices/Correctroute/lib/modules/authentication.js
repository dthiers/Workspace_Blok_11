// TODO: write authentication middleware that checks for the user for every request
module.exports = function(mongoose, passport, LocalStrategy){
  var self = this;
  var User = mongoose.model('User');

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user){
        if(err) { console.log('im an error ' + err);return done(err); }
        // If user doesn't exist
        if(!user) {
          console.log('invalid user');
          return done(null, false, { message: "Incorrect username" });
        }
        // If invalid password
        user.validPassword(password, function(err, isMatch) {
          if(err || !isMatch) return done(err, false, { message: "Incorrect password" });
          return done(null, user);
        })
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    console.log("serializeUser " + user);
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    console.log("deserializeUser " + Object.keys(user));
    done(null, user);
  });

  self.isLoggedIn = function(req, res, next){
    //console.log(req.user);
    if(req.isAuthenticated()) {return  next() }
    else { res.redirect('login'); }
  }
  self.isAdmin = function(req, res, next){
    if(req.user) { return next(); }
    else {res.redirect('/') ; }
  }

}
