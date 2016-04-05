var bcrypt = require('bcrypt');


module.exports = function(mongoose){
  var Schema = mongoose.Schema;

  var userSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  })

  // Validate password against bcrypt hash
  userSchema.methods.validPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if(err) return cb(err);
      console.log(password + "  " + isMatch);
      callback(null, isMatch);
    })
  }

  // Checks if two hashed passwords match
  userSchema.methods.passwordBcryptMatch = function(password){
    return this.password === password;
  }

  // TODO: pre save
  userSchema.pre('save', function(next) {
    var user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if(err) { return next(err); }

      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) { return next(err); }

        user.password = hash;
        next();
      })
    })
  })

  mongoose.model('User', userSchema);
}
