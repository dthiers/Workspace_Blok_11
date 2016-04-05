var express = require('express');
var router = express.Router();

var result = {
  view: 'index',
  data: {
    title: 'Home page of the API',
    instruction: 'USage of the API willbe shwon efjfjdsklfjds'
  }
}

module.exports = function(){

  router.get('/', function(req, res, next) {
    console.log(req.headers['content-type']);
    result.data.title = "je moeder";
    res.return(result);
  });

  return router;
}
