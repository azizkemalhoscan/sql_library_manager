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



// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log('500 handler called');
  res.render('books/service-error');
  next(err);
});



app.use((req, res, next) => {
  res.status(404).render('books/page-not-found');
})

// This is Inccorect

// app.use((err, req, res, next) => {
//   res.status(err.status || 404)
//   console.log('this is 404')
//   res.render('books/page-not-found')
// })

module.exports = app;
