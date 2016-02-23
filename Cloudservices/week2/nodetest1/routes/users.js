var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function(e, docs){
    res.render('users', {"users":docs});
  });
});

// Show page new user
router.get('/new', function(req, res, next){
  res.render('newuser', {message: "empty message"});
});

// Add new user
router.post('/', function(req, res){
  // TODO: add user
  var db = req.db;

  var userName = req.body.username;
  //var userEmail = req.body.useremail;

  var collection = db.get('usercollection');

  collection.insert({
    "username" : userName
  },
  function(err, doc){
    if(err){
      res.send("There was a problem adding " + userName);
    } else {
      res.send("/users");
    }
  });
});

router.delete('/:user_id', function(req, res) {
  var db = req.db;

  var id = req.params.user_id;

  var collection = db.get('usercollection');
  //
  collection.remove({
    _id: id
  }, function(err, user){
    if(err){
      res.send(err);
    } else {
      res.send("Success");
      //res.redirect("/users");
    }
  });
});


module.exports = router;
