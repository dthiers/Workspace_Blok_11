var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/*
====================== OWN STUFF =======================
*/

// Config + database init
//require('./model/mongooseInit');
var config = require('./config');

var DbModule = require('./lib/modules/dbModule');
var dbModule = new DbModule(config.db);

// Initalize the database
//console.log(mongoose.models.user);

// var UserRepo = require('./model/repositories/userRepository');
// var userRepo = new UserRepo();
//
// var ProjectRepo = require('./model/repositories/projectRepository');
// var projectRepo = new ProjectRepo();

console.log(dbModule.repositories);
// Routers
var index = require('./routes/index');
var users = require('./routes/users')(dbModule.repositories.user);
// var api = require('./routes/api');
// var hours = require('./routes/hours');
//var projects = require('./routes/projects')(projectRepo);

/*
====================== OWN STUFF =======================
*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make DB accessibly to our router
app.use(function(req, res, next){

  // TESTING PURPOSES
  req.user = { username: "Dion Thiers"};
  // TESTING PURPOSES

  next();
})

app.use('/', index);
app.use('/users', users);
// app.use('/api', api);
// app.use('/hours', hours);
// app.use('/projects', projects);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
