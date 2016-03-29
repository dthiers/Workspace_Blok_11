// TODO: database requiren

var projectRepository = function(){
  var self = this;

  // Get all users
  self.getAllProjects = function(req, res, next){
    // TODO: get all users by id
    res.json("Project repository");
  }
}

module.exports = projectRepository;
