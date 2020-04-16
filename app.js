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
app.use((req, res, next) => {
  const err = new Error('Sorry cannot find it');
  err.status = 404;
  console.log('404 handler called')
  next(err);
  console.log('404 handler called')
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.error = err;
  res.status(err.status || 500);
  console.log('500 handler called');
  res.render('error');
});

module.exports = app;
