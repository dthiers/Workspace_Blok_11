var express = require('express');
var router = express.Router();

var ProjectRepo = require('../model/repositories/projectRepository');
var projectRepo = new ProjectRepo();


router.route('/')
  .get(projectRepo.getAllProjects);

module.exports = router;

// module.exports = function(param){
//
//   router.get('/', function(req, res, next) {
//     res.send('Je moeder op een bakfiets')
//   })
//
//   return router;
// }
