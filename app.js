var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var routes = require('./routes/index');
var books = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use(books);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = new Error('Sorry cannot find it');
  error.status = 404;
  next(error);
});


// error handler
app.use(function(error, req, res, next) {
  // set locals, only providing error in development
  res.locals.error = error;
  res.status(error.status);
  if(error.status === 404){
    res.render('page-not-found');
    console.log(error.message)
  } else {
    res.render('error')
  }
});

module.exports = app;
