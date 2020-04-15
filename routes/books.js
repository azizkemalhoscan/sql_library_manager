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

/* Redirect to index page*/

// router.get('/', asyncHandler(async(req, res) => {
//   res.redirect('index' , { book: {}, title: "New Book"});
// }))

/* Get all books in a descending order make it alphabetically */
//  NEED ADDITIONAL WORK
router.get('/books', asyncHandler(async( req, res) => {
  const books = await Book.findAll({ order: [["createdAt", "DESC"]]});
  console.log(books);
  res.render('books', { books, title: "Aziz Get all books"});
}));


/* Crete new book form*/
// CHECKED

router.get("/books/new", asyncHandler(async(req, res) => {
  res.render('books/new-book' , { book: {}, title: "New Book"});
}))


/* POST create movie */
// ABLE TO CREATE BUT  redirect does not work properly
router.post('/books/new/', asyncHandler(async(req, res) => {
  const book = await Book.create(req.body);
  res.redirect(book.id)
}));


/* Get an individual book */

router.get("/books/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("books/update-book" , { book: book, title: book.title });
}));


/* Update books
*/
router.post('/books/:id', asyncHandler (async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect('/books/');
}));


/* Delete book */
router.post('/books/:id/delete', asyncHandler( async(req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books');
}));


module.exports = router;

/* GET / retrieve book to update */
// router.get('/:id/edit', asyncHandler(async (req, res) => {
//   const book = await Book.findByPk(req.params.id);
//   res.render('edit', { book, title: 'Edit book' });
// }));

/* PUT update book */
// router.put('/books/:id', asyncHandler (async (req, res) => {
//   const book = await Book.findByPk(req.params.id);
//   await book.update(req.body);
//   res.redirect('books/' + book.id);
// }));


/* This is a form to delete an article*/

// router.get('/:id/delete', asyncHandler( async(req, res) => {
//   const book = Book.findByPk(req.params.id);
//   res.render("delete", { book, title: "Delete book"})
// }))

/* Delete book */
// router.post('/books/:id/delete', asyncHandler( async(req, res) => {
//   const book = await Book.findByPk(req.params.id);
//   await book.destroy();
//   res.redirect('/books');
// }));


