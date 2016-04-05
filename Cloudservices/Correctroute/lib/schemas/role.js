module.exports = function(mongoose){

  var Schema = mongoose.Schema;

  var roleSchema = new Schema({
    role: {
      type: String,
      enum: ['admin', 'user']
    }
  })

  return mongoose.model('Role', roleSchema);
}
