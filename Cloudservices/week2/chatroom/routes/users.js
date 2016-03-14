var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // TODO: alle users ophalen uit de database;
  var db = req.db;
  var collection = db.get('users');
  collection.find({}, {}, function(e, docs){
    res.json(docs);
  });
  //res.render('users', {title: "Users"});
})

router.get('/:id', function(req, res, next) {



  var db = req.db;
  var collection = db.get('users');
  collection.find({_id: req.params.id}, {}, function(err, doc) {
    // res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json(doc[0]);
  })
})



// Post new user
router.post('/', function(req, res) {
  var db = req.db;
  var collection = db.get('users');

  var username = req.body.username;
  if(username){
    collection.insert({
      username: username
    }, function(err, doc) {
      if(err){
        res.send("Oops, something went wrong")
      } else {
        res.send("Success!");
      }
    })
  }
})

// Update a user
router.put('/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('users');

  if(req.body.username){
    collection.update({_id: req.params.id}, {username: req.body.username}, function(err, doc) {
      if(err){
        res.send('There was an error');
      } else {
        res.send('SUCCESS! ' + req.body.username + " is updated");
      }
    })
  }
})

// Delete a user by ID
router.delete('/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('users');

  collection.remove({_id: req.params.id}, function(err, doc) {
    if(err) {
      res.send('THERE WAS AN ERROR OWNOOOO');
    } else {
      res.send('User with ID ' + req.params.id + " was deleted");
    }
  })
})


module.exports = router;

var users = [
  { username: "Dion Thiers" },
  { username: "Erika Terpstra" },
  { username: "Govert Simons" },
  { username: "Fahiem Karsodimedjo" }
]
