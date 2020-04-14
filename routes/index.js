var express = require('express');
var router = express.Router();

/* GET home page. */

// Changed res.render('books', { title: 'Books' }); to => res.redicrect

router.get('/', function(req, res, next) {
  res.redirect('/books');
});

module.exports = router;
