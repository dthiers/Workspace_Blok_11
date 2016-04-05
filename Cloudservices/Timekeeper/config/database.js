
module.exports = function(mongoose, config){

  var self = this;

  var schemaPaths = [
    '../lib/schemas/user'
  ]
  var repoPaths = [
    { name: 'user', path: '../lib/repositories/userRepository' }
  ]

  self.initSchemas = function(){
    for(var i = 0; i < schemaPaths.length; i++){
      require(schemaPaths[i])(mongoose);
    }
  }

  self.initRepositories = function(){
    if(!self.repositories){
      self.repositories = {};
    }
    for(var i = 0; i < repoPaths.length; i++){
      var Repo = require(repoPaths[i].path);
      self.repositories[repoPaths[i].name] = new Repo(mongoose);
    }
  }

  self.initMongoose = function(){
    mongoose.connect(config.connection, function(err) {
      if(err){
        console.log('DB error : ' + err );
      } else {
        console.log('Connected maat');
      }
    })
  }

  self.initMongoose();
  self.initSchemas();
  self.initRepositories();

}
