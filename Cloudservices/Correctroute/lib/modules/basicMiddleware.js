// Basic middleware

// TODO: DIT WERKT NIET
// TODO: DIT WERKT NIET
// TODO: DIT WERKT NIET
// TODO: DIT WERKT NIET
// TODO: DIT WERKT NIET
// TODO: DIT WERKT NIET
// TODO: DIT WERKT NIET
// TODO: DIT WERKT NIET
// TODO: DIT WERKT NIET
// TODO: DIT WERKT NIET


var middleware = function(mongoose, passport, LocalStrategy){
  return function(req, res, next){
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
            console.log(err);
            if(err) return done(err, false, { message: "Incorrect password" });
            return done(null, user);
          })
        });
      }
    ));

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });
    next();
  }
}

module.exports = middleware;
