var express = require('express');
const Sequelize = require('sequelize');
var router = express.Router();
var Book = require('../models').Book;


// Handler function to wrap each route

function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next);
    } catch(error){
      next(error);
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
  const books = await Book.findAll({ order: [["title", "ASC"]]});
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
  let book;
  try{
    book = await Book.create(req.body);
    res.redirect(book.id);
  } catch (error) {
    if(error.name === "SequelizeValidationError"){
      book = await Book.build(req.body);
      res.render('books/new-book', { book: book, errors: error.errors, title: "New Book"})
    } else {
      throw error;
    }
  }
}));


/* Get an individual book */

router.get("/books/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book){
    res.render("books/update-book" , { book: book, title: book.title });
  } else {
    throw error;
  }
}));


/* Update books
*/
router.post('/books/:id', asyncHandler (async (req, res) => {
  let book;
  try{
    book = await Book.findByPk(req.params.id);
    if(book){
      await book.update(req.body);
      res.redirect(book.id);
    } else {
      res.sendStatus(404);
    }
  } catch(error){
    if(error.name === "SequelizeValidationError"){
      book = await Book.build(req.body);
      res.render('books/update-book', { book: book, errors: error.errors, title: "New Book"})
    } else {
      throw error;
    }
  }
}));


/* Delete book */
router.post('/books/:id/delete', asyncHandler( async(req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book){
    await book.destroy();
    res.redirect('/books');
  } else {
    res.sendStatus(404);
  }
}));


module.exports = router;


