var express       = require('express');

var mongoose      = require('mongoose');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var JwtStrategy   = require('passport-jwt');

// var jwt           = require('jwt-simple');
// var JwtStrategy   = require('passport-jwt').Strategy;

var app           = express();

var flash         = require('connect-flash');

var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');

var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');


// CONFIG FILE
var config = require('./config/config');

// INIT DATABASE
var Database = require('./config/database');
var database = new Database(mongoose, config.database);

// RETURN MODULE FOR QUERY AND STUFF
var returnModule = require('./lib/modules/returnModule');
app.use(returnModule);

// PASSPORT LOCAL
var Auth = require('./config/passport');
var auth = new Auth(mongoose, passport, config.secret);

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'testpassport',
  resave: true,
  saveUninitialized: true
}));

// Used for CSS
app.use(express.static('public'));

var index = require('./routes/index')();
var users = require('./routes/users')(database.repositories.user);
var login = require('./routes/login')(passport);
var admin = require('./routes/admin')(database.repositories);

// Always require authenticates
//app.use('/admin', auth.isLoggedIn);
//app.use('/admin', auth.isLoggedIn, express.static(__dirname+"/public"));

app.use('/', index);
app.use('/users', auth.isAuthorized, users);
app.use('/login', login);
app.use('/admin', auth.isAuthorized, auth.isAdmin, admin);
app.use('/signup', auth.authenticateUser);
app.use('/logout', function(req, res){
  req.logout();
  res.redirect('/login')
})

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
