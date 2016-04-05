// Local strategy used for local login
var LocalStrategy   = require('passport-local');

// JWT stategy used for API calls from outside
var JwtStrategy     = require('passport-jwt').Strategy;
var ExtractJwt      = require('passport-jwt').ExtractJwt;
var jwt             = require('jwt-simple');


// Mongoose: used to fetch user form db + fetch model on mongoose object
// Passport is passed

module.exports = function(mongoose, passport, config){
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.jwt;

  var User = mongoose.model('User');
  var self = this;
  /*
   *
   * LOCAL Strategy
   *
   */
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
    //console.log("serializeUser " + user);
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    //console.log("deserializeUser " + Object.keys(user));
    done(null, user);
  });

  /*
   *
   * LOCAL Strategy
   *
   */

   /*
    *
    * JWT Strategy
    *
    */
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
    }));
    /*
     *
     * JWT Strategy
     *
     */



   return {
     isLoggedIn: function(req, res, next){
       if(req.isAuthenticated()) {return  next() }
       else { res.redirect('login'); }
     },
     isAdmin: function(req, res, next) {
       if(req.user && req.user.isAdmin) { next(); }
       else { res.error(403, "Only allowed for administrators")}
     },
     // Authenticate a user
      authenticateUser: function(req, res, next){
        User.findOne({
          username: req.body.username
        }, function(err, user) {
          if(err) { return next(err); }
          if(!user) {
             res.error(404, "user not found")
           }
           else {
             user.validPassword(req.body.password, function(err, isMatch) {
               if(!err && isMatch){
                 // TODO: delete password + _id
                 var token = jwt.encode(user, config.secret);
                 // Return token to user
                 res.send({ success: true, token: 'JWT ' + token });
               }
               else {
                 res.error(400, "Wrong password");
               }
             })
           }
        })
      }
      // End of authenticateUser
      ,
      // Check if token matches a user
      isAuthorized: function(req, res, next){
        if(req.isAuthenticated()) {
          return next();
        }

        var token = req.body.token || req.query.token || req.header['x-access-token'];

        if(token){
          var decoded = jwt.decode(token, config.secret);
          console.log("decoded: " + decoded.isAdmin);
          User.findOne({ username: decoded.username }, function(err, user) {
            if(err && !user) { return next(err) }
            else {
              if(user.passwordBcryptMatch(decoded.password)) {
                req.user = decoded;
                return next();
              } else {
                // If password in token is incorrect
                res.error(400, "Wrong password")
              }
            }
          })
        }
        // If token isn't supplied and no session is set
        else {
          console.log('komen dafsfdwe hier dan?');
          res.error(403, "Unauthorized");
        }
      }
   }
}
