var express = require('express');
var router = express.Router();


module.exports = function(projectRepo) {
  router.route('/')
    .get(projectRepo.getAllProjects);

  return router;
}



// module.exports = function(param){
//
//   router.get('/', function(req, res, next) {
//     res.send('Je moeder op een bakfiets')
//   })
//
//   return router;
// }
