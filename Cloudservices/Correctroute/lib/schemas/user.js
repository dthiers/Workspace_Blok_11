
// Schema for users
module.exports = function(mongoose){

  // Database
  var Schema            = mongoose.Schema;
  var bcrypt            = require('bcrypt');
  var SALT_WORK_FACTOR  = 10; // Standard encrypt

  // TODO: entry testen in de databse
  var userSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true},
    isAdmin: { type: Boolean, required: true}
  });

  // Validate password against bcrypt hash
  userSchema.methods.validPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, isMatch) {
      if(err) return cb(err);
      console.log(password + "  " + isMatch);
      callback(null, isMatch);
    })
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
  // Schema maken
  // var userSchema = new Schema({
  //   // Impliciet wordt _id naar Schema.ObjectId
  //   firstname:      { type: String, required: true },
  //   surname:        { type: String, required: true },
  //   surnamePrefix:  { type: String, required: false},
  //   email:          {
  //     type: String,
  //     required: true,
  //     unique: true,
  //     validate: {
  //       validator: function(email) {
  //         var emailRegex = '/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/';
  //         return emailRegex.test(email);
  //       }
  //     }
  //   },
  //   password:       {
  //     type: String,
  //     required: true,
  //     validate: {
  //       validator: function(v){
  //         return v.length >= 6
  //       },
  //       message: 'Password must contain 6 or more characters'
  //     }
  //   }
  // })


  // Return model from Schema
  return mongoose.model('User', userSchema);


}
