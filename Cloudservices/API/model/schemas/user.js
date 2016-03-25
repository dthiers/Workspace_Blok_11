/*
======== USER ENTITIES ===========
- _id             (objectId from Mongo)
- firstname       (contains a-zA-Z, no special chars.)
- surname         (contains a-zA-Z, no special chars.)
- surnamePrefix   (De, Van, Von, etc)(contains a-zA-Z, no special chars.)
- email           (email format)
- password        (special rules. Hashed, but how?)
-
*/

// Schema for users
module.exports = function(mongoose){

  // Database
  var Schema = mongoose.Schema;

  // Schema maken
  var userSchema = new Schema({
    // Impliciet wordt _id naar Schema.ObjectId
    firstname:      { type: String, required: true },
    surname:        { type: String, required: true },
    surnamePrefix:  { type: String, required: false},
    email:          {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(email) {
          var emailRegex = '/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/';
          return emailRegex.test(email);
        }
      }
    },
    password:       {
      type: String,
      required: true,
      validate: {
        validator: function(v){
          return v.length >= 6
        },
        message: 'Password must contain 6 or more characters'
      }
    }
  })


  // Return model from Schema
  return mongoose.model('user', userSchema);


}
