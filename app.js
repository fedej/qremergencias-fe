var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var register = require('./routes/register');
var forgotPassword = require('./routes/forgotPassword');
var reset = require('./routes/reset');
var login = require('./routes/login');
var users = require('./routes/users');
var home = require('./routes/home');
var error = require('./routes/error');
var completeRegistration = require('./routes/completeRegistration');
var emailConfirmation = require('./routes/emailConfirmation');
var resetPasswordSuccess = require('./routes/resetPasswordSuccess');
var forgotPasswordSuccess = require('./routes/forgotPasswordSuccess');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/register', register);
app.use('/forgotPassword', forgotPassword);
app.use('/reset', reset);
app.use('/login', login);
app.use('/users', users);
app.use('/home', home);
app.use('/error', error);
app.use('/completeRegistration', completeRegistration);
app.use('/emailConfirmation', emailConfirmation);
app.use('/resetPasswordSuccess', resetPasswordSuccess);
app.use('/forgotPasswordSuccess', forgotPasswordSuccess);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
