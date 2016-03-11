var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // schema
  var testSchema = req.db.Schema({
    name: String
  });

  // Function added to the schema
  testSchema.methods.speakUpLilBitch = function(){
    var greeting = this.name ? "Joo waddup lil bitch " + this.name : "Bitch ass nameless penis";

    console.log;(greeting);
  }

  // Model
  var test = req.db.model('test', testSchema);

  // Test maken nu??!
  var testObj = new test({ name: "Jemoeder" });

  testObj.speakUpLilBitch();
  console.log(testObj.name);
  res.send(testObj.name);
});

router.get('/lulniet', function(req, res, next) {
  res.send('jooo');
})


module.exports = router;
