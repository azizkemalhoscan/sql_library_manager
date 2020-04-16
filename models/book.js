
'use strick';


const Sequelize = require('sequelize');

// Defined a model for database. Model has a title, an author, genre and year
module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}
    Book.init({
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Please enter a "title"'
                }
            },
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Please enter an "author"'
                }
            },
        },
        genre: Sequelize.STRING,
        year: Sequelize.INTEGER
    }, {sequelize});

    return Book;
};
