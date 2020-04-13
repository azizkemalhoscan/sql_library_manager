var express = require('express');
var router = express.Router();
var Book = require('../models').Book;


// const router = new Router();

/* POST create movie */

router.post('/', async (req, res, next) => {
  const book = await Book.create(req.body);
  res.redirect('/books' + book.id)
});


/* GET / retrieve book to update */
router.get('/book_detail', async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  res.render('book_detail', { book, title: 'Edit book' });
});

/* PUT update book */
router.put('/:id', async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect('/books/' + book.id);
});

/* Delete book */
router.post('/books/:id/delete', async (req, res) => {
  const bookToDelete = await Book.findByPk(req.params.id);
  await bookToDelete.destroy();
  res.redirect('/books');
});
