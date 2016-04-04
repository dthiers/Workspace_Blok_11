var express = require('express');
var router = express.Router();

/*
======== HOUR ENTITIES ===========
- _id             (objectId from Mongo)
- _projectId
- startTime       (datetime) <-- Maybe work with datetime objects.
- endTime         (datetime) <-- Maybe work with datetime objects.
                    (to work with date: https://docs.mongodb.org/manual/reference/operator/aggregation/year/ )
- breakDuration   (timeobject)
- exception       textfield
- media           (binData) TODO: onderzoeken
- geolocation     ( https://developers.google.com/places/ ) ( https://developers.google.com/maps/documentation/javascript/places#place_search_requests )
- geolocation     { lat: float, lng: float }

*/


/*
======== PROJECT ENTITIES ===========
- _id             (objectId from Mongo)
- projectName     (name for project, example: Restaurant X)
- projectFunction (function for project, example: waiter in Restaurant X)
-

*/

//
router.get('/', function(req, res, next){
  console.log(module.exports);
  res.json("test");
})

module.exports = router;
