var express = require('express');
var router = express.Router();

var result = {
  view: 'index',
  data: {
    title: 'Im on the admin page',
    instruction: 'This is only vissible if an administrator is logged in'
  }
}

module.exports = function(){

  router.get('/', function(req, res, next){
    res.return(result);
  })

  return router;
}
