

module.exports = function(mongoose, passport, JwtStrategy){
  var User = mongoose.model('User');

  var self = this;
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = "testkey";

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({ id: jwt_payload.id }, function(err, user) {
      if(err){
        return done(err, false);
      }
      if(user) {
        done(null, user);
      }
      else {
        done(null, false);
      }
    })
  }))

}
