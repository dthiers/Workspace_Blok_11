

module.exports = function(mongoose){
  var User = mongoose.model('User');

  var self = this;

  self.getAllUsers = function(req, res, next){
    User.find({}, function(err, users) {
      if(err) { return next(err); }
      else { res.return(result = {view: 'data', data : users}); }

    })
  }

}
