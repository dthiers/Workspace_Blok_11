module.exports = function(dbConfig) {
  console.log('BEGIN VAN DBMODULE');
  var mongoose = require('mongoose');

  var self = this;

  var schemaPaths = [
    '../schemas/user'
  ];

  var repositoryPaths = [
    { name: 'user', path: '../repositories/userRepository' },
    { name: 'routes', path: '../repositories/routesRepository'}
  ]

  var requireSchemas = function(){
    for(var i = 0; i < schemaPaths.length; i++){
      require(schemaPaths[i])(mongoose);
    }
  }

  // TODO: repositories laden
  var requireRepositories = function(){
    if(!self.repositories){
      self.repositories = {};
    }
    for(var i = 0; i < repositoryPaths.length; i++){
      var Repo = require(repositoryPaths[i].path);
      //console.log(new NewRepo());
      self.repositories[repositoryPaths[i].name] = new Repo(mongoose);
    }


    // var UserRepo = require('./model/repositories/userRepository');
    // var userRepo = new UserRepo();
  }

  // TODO: database Initalisation
  mongoose.connect(dbConfig.connection, function(err) {
    if(err){
      console.log('DB error : ' + err );
    } else {
      console.log('Connected maat');
    }
  })


  //self.repositories = {};
  requireSchemas();
  requireRepositories();
}
