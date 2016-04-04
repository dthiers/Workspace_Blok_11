var express = require('express');
var router = express.Router();

// This page is shown no matter if a user is logged in or not. This is an HTML page
console.log('TESTJFJKDJF');
/* GET home page. */
router.get('/', function(req, res) {
  console.log('ik ben in de index');
  res.render('index', {
    title: 'Home page of the API',
    instruction: 'Usae of the API will be shown here'
  });
});

module.exports = router;
