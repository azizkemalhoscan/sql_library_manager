
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
                    msg: '"Title" Required!'
                }
            },
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: '"Author" required!'
                }
            },
        },
        genre: Sequelize.STRING,
        year: Sequelize.INTEGER
    }, {sequelize});

    return Book;
};
