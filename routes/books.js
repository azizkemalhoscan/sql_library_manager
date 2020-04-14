var express = require('express');
var router = express.Router();
var Book = require('../models').Book;


// Handler function to wrap each route

function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}


/* POST create movie */

router.post('/', asyncHandler(async(req, res, next) => {
  const book = await Book.create(req.body);
  res.redirect('/books' + book.id)
}));


/* Get an individual book */

router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("/books/book_detail" , { book: book, title: book.title });
}));


/* Get all books in a descending order*/

router.get('/', asyncHandler(async( req, res) => {
  const books = await Book.findAll({ order: [["createdAt", "DESC"]]});
  res.render('books', { books, title: "Aziz Get all books"});
}));


/* GET / retrieve book to update */
router.get('/:id/edit', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render('books/edit', { book, title: 'Edit book' });
}));

/* PUT update book */
router.put('/:id/edit', asyncHandler (async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect('/books/' + book.id);
}));


/* This is a form to delete an article*/

router.get('/:id/delete', asyncHandler( async(req, res) => {
  const book = Book.findByPk(req.params.id);
  res.render("books/delete", { book, title: "Delete book"})
}))

/* Delete book */
router.post('/:id/delete', asyncHandler( async(req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books');
}));


module.exports = router;
