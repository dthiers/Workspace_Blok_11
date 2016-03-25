function mongooseInit(mongoose, config){
  var schemas = config.schemas;

  // TODO: database Initalisation
  mongoose.connect(config.connection, function(err) {
    if(err){
      console.log('DB error : ' + err );
    } else {
      console.log('Connected maat');
    }
  })

  // Load all schemas
  for(var i = 0; i < schemas.length; i++) {
        schemas[i](mongoose);
  }
}

module.exports = mongooseInit;
