var express = require('express');
var router = express.Router();


/* GET rooms page. */
router.get('/', function(req, res, next) {
  // TODO: alle rooms in een object laden.
  // Request db from app.
  var db = req.db;
  // Set the collection
  var collection = db.get('rooms');
  collection.find({}, {}, function(e, docs){
    res.json(docs);
  });
  //res.render('rooms', { title: 'Rooms' });
});

// Insert room
router.post('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('rooms');

  var roomName = req.body.roomName;

  collection.insert({
    "roomName" : roomName
  }, function(err, doc) {
    if (err) {
      // If the insert fails
      res.send("there was a problem adding the information to the database");
    } else {
      // Else, redirect to room with id blabla to show the lines

      // This should be a correct header containing the correct response message (status 400 or something like that)
      res.send("Success!");
    }
  })
})


// Get room with id
router.get('/:id', function(req, res, next) {
  var db = req.db;
  var collection = db.get('rooms');

  collection.find({ _id: req.params.id}, {}, function(e, docs){
    res.json(docs);
  })
})

// Get all lines for specific chatroom
router.get('/:id/lines', function(req, res, next) {
  var db = req.db;
  var collection = db.get('lines');

  collection.find({ roomId: req.params.id}, {}, function(e, docs) {
    res.json(docs);
  })
})

// Get all users per room
router.get('/:id/users', function(req, res, next) {
  var db = req.db;
  var collection = db.get('lines');

  collection.find({ roomId: req.params.id}, {fields : {userId: 1}}).forEach(function(doc) {
     db.get('users').find({_id:{$in:doc.userId}}).forEach(printjson);
  })
  res.json(userIds);
})


// Post a new line into room with :id
router.post('/:id/lines', function(req, res) {
  var db = req.db;

  var roomId = req.body.roomId;
  var line = req.body.line;

  var collection = db.get('lines');

  collection.insert({
    "roomId" : roomId,
    "text" : line
  }, function(err, doc) {
    if (err) {
      // If the insert fails
      res.send("there was a problem adding the information to the database");
    } else {
      // Else, redirect to room with id blabla to show the lines

      // This should be a correct header containing the correct response message (status 400 or something like that)
      res.send("Success!");
    }
  })
})

// Update a room name
router.put('/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('rooms');


  if(req.body.roomName){
      collection.update({_id: req.params.id}, {roomName: req.body.roomName}, function(err, doc) {
        if(err){
          res.send('THERE WAS A SLIGHT MISTAKE FUCKFACE');
        } else {
          res.send('Room with ID ' + req.params.id + " was updated to name " + req.body.roomName);
        }
      })
  }
})

// Delete a room with ID
router.delete('/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('rooms');

  var id = req.param.id;

  collection.remove({ _id: req.params.id}, function(err, doc) {
    if(err){
      res.send('OH NO, I SNAPPY DHE INTERWEBS');
    } else {
      // TODO: cascade delete the lines that were in the room
      var collection2 = db.get('lines');
      collection2.remove({roomId: req.params.id}, function(err, doc) {
        // nothing
      })
      res.send('Room with ID ' + req.params.id + " was deleted");
    }
  })
})


// http://stackoverflow.com/questions/2350495/how-do-i-perform-the-sql-join-equivalent-in-mongodb
module.exports = router;
//
// var rooms = [
//   { roomName: "Hyper chatroom" },
//   { roomName: "Hyves chatroom" },
//   { roomName: "Zwembad West chatroom" }
// ]
//
// var lines = [
//   { roomId: "56d888c9eb55e8b72e5bc005",
//     userId: "56d8886feb55e8b72e5bbfff",
//     text: "Messsage",
//     date: new Date()
//   },
//   { roomId: "56d888c9eb55e8b72e5bc005",
//     userId: "56d8886feb55e8b72e5bbfff",
//     text: "Messsage",
//     date: new Date()
//   },
//   { roomId: "56d888c9eb55e8b72e5bc005",
//     userId: "56d8886feb55e8b72e5bbfff",
//     text: "Messsage",
//     date: new Date()
//   },
//   { roomId: "56d888c9eb55e8b72e5bc005",
//     userId: "56d8886feb55e8b72e5bbfff",
//     text: "Messsage",
//     date: new Date()
//   }
// ]
