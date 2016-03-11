// Schema for users
module.export(mongoose, middleware){

  // Database
  var schema = mongoose.schema;

  // Schema maken
  var userSchema = new Schema({
    // Impliciet wordt _id naar Schema.ObjectId
    name: { type: String, required: true }
  });

  // Validation on DB level
  userSchema.path('name').validate(function() {
    return this.name.length >= 4;
  });

  //


}
