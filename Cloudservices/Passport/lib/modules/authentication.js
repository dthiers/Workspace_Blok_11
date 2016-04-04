// TODO: write authentication middleware that checks for the user for every request
module.exports = function(mongoose, passport, LocalStrategy){

  var User = mongoose.model('User');

  passport.use(new LocalStrategy(
    function(username, password, next) {
      User.findOne({ username: username }, function(err, user){
        if(err) { console.log('im an error ' + err);return next(err); }
        // If user doesn't exist
        if(!user) {
          console.log('invalid user');
          return next(null, false, { message: "Incorrect username" });
        }
        // If invalid password
        user.validPassword(password, function(err, isMatch) {
          console.log(err);
          if(err) return next(null, false, { message: "Incorrect password" });
          return next(null, user);
        })
        //
        // if(!user.validPassword(password)){
        //   console.log('invalid password');
        //   return done(null, false, { message: "Incorrect password" });
        // }
        //
        // return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

}
