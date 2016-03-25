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

module.exports = function(mongoose){

  var Schema = mongoose.schema;

  var hourSchema = new Schema({
    _projectId:       { type: objectId },
    startTime:        { type: datetime },
    endTime:          { type: datetime },
    breakDuration:    { type: timeobject },
    exception:        { type: String },
    media:            { type: binData },
    geolocation:      [
          { lat: { type: float(6, 10) } },
          { lng: { type: float(6, 10) } }
    ]
  })

  // Method on the Schema
  hourSchema.methods.saySomething = function saySomething(){
    console.log('Say something from the schema');
  }

  // Validator on the Schema
  hourSchema.path.('exception').validate(function(v) {
    return v.length > 5;
  }, 'My error here');
}
