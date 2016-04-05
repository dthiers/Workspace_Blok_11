var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jwt-simple');
var config = require('../config');

module.exports = function(mongoose, passport, JwtStrategy, config){

  return function(){
    var self = this;

    var User = mongoose.model('User');
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({ id: jwt_payload.id }, function(err, user){
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        }
        else {
          done(null, false)
        }
      })
    }))

    // Authenticate a user
    self.authenticateUser = function(req, res, next){
      User.findOne({
        username: req.body.username
      }, function(err, user) {
        if(err) { return next(err); }
        if(!user) {
          res.error(404, "user not found");
        }
        else {
           user.validPassword(req.body.password, function(err, isMatch) {
             if(!err && isMatch){
               // TODO: delete password + _id
               var token = jwt.encode({
                 firstname: user.firstname,
                 lastname: user.lastname,
                 username: user.username }, config.secret.secret);
               // Return token to user
               res.return(200, "success");
             }
             else {
               res.return(400, "Wrong password");
             }
           })
         }
      })
    }

    self.isAuth = function(req, res, next) {
      next();
    }


    self.isAuthenticated = function(req, res, next){

      var token = getToken(req.headers);
      if (token) {
        var decoded = jwt.decode(token, config.secret.secret);
        User.findOne({
          name: decoded.name
        }, function(err, user) {
            if (err) {return next(err);}
            if (!user) {
              return res.error(403, "authentication failed");
            }
            else {
              return res.return(200, "welcome");
            }
        });
      } else {
        res.return(403, "no token provided");
      }
    }

    self.getToken = function(headers){
      if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
          return parted[1];
        } else {
          return null;
        }
      } else {
        return null;
      }
    }









  }
}
