// Schema for rooms
module.exports = function(mongoose, middleware){

  // Database
  var schema = mongoose.schema;

  // Schema maken
  var roomSchema = new Schema({
    // Impliciet wordt _id naar Schema.ObjectId
    name: { type: String, required: true }
  });

  // Validation on DB level
  roomSchema.path('name').validate(function() {
    return this.name.length >= 4;
  });

  //
  

}
