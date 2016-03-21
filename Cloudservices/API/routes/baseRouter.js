// This is the only place where this has to be done.
var express = require('express');
var router = express.Router();



// Bind basic functionality like errHandling to the router object
router.use(function(req, res, next){
  // Bind a function to the response object
  res.return = function(){
    return "I'm here from the baseRouter";
  }
  next();
})

module.exports = router;
