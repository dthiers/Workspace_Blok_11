var express       = require('express');

var mongoose      = require('mongoose');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var jwt           = require('jwt-simple');
var JwtStrategy   = require('passport-jwt').Strategy;

var app           = express();

var flash         = require('connect-flash');

var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');

var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');

/*
====================== OWN STUFF =======================
*/

var config = require('./config');

var DbModule = require('./lib/modules/dbModule');
var dbModule = new DbModule(config.db);


/*
====================== OWN STUFF =======================
*/

app.use(morgan('dev'));
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

// authentication
var Auth = require('./lib/modules/authentication');
var auth = new Auth(mongoose, passport, LocalStrategy);

var jwtt = require('./config/passport')(mongoose, passport, JwtStrategy, config.secret);


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//var mw = require('./lib/modules/basicMiddleware')(mongoose, passport, LocalStrategy);
var returnModule = require('./lib/modules/returnModule');
// Routers
var index = require('./routes/index')();
var admin = require('./routes/admin')();
var login = require('./routes/login')(dbModule.repositories.routes, passport);
var signup = require('./routes/signup')(dbModule.repositories.routes);
var profile = require('./routes/profile')();
var logout = require('./routes/logout')(dbModule.repositories.routes);
var users = require('./routes/users')(dbModule.repositories.user);
//var routes = require('./routes/routes.js')(app, dbModule.repositories.routes, passport);


app.use(returnModule);

// Admin panel, only accessible if user is isAdmin
app.use('/admin', auth.isAdmin, express.static(__dirname+"/public"));

var members = require('./routes/members')(mongoose, jwtt);
app.use('/members', members);

app.use('/', index);
//app.use('/admin', auth.isAdmin, admin);
app.use('/login', login);
app.use('/profile', auth.isLoggedIn, profile);
app.use('/signup', signup);
app.use('/logout', auth.isLoggedIn, logout);
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
