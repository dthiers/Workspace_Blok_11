var router = require('./baseRouter.js');

// Get API
router.get('/', function(req, res, next){
  res.send('Test of de api hier komt zonder authentication');
});

module.exports = router;
