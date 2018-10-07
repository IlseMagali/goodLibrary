const Book = require("./books.model");
const Author = require("../authors/authors.model");
const Genre = require("../genres/genre.model");

exports.bookList = (limit = 50, page = 1, filter = {}, sort = "") => {
  return Book.find(filter)
    .limit(limit)
    .skip(limit * (page - 1))
    .sort(sort)
    .exec();
};

exports.createBook = async payload => {
  // validate the object id related to author and genre
  let authorFound = await Author.findById(payload.author);
  if (!authorFound) {
    throw new Error("Error");
  }

  let genreFound;
  let genreArray = payload.genre;

  // hacer uso de genre.controller
  // findGenres
  // diffByGenresId
  const book = new Book(payload);

  return book.save();
};

exports.createGenre = async () => {

}