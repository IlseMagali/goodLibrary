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

  // validate array of genres could be part of the genre service
  // containing all this:
  if (genreArray.length !== 0) {
    genreArray.forEach(function(elem) {
      try {
        genreFound = Genre.findById(elem);
        console.log(elem);
      } catch (err) {
        next(err);
      }
    });

    // validate the object id related to genre:
    // making some async stuff with promise.all() 
    // let genreFound = await Genre.findById(payload.genre);
  }
  /* let genreFound = Genre.findById(payload.genre); */
  const book = new Book(payload);

  return book.save();
};

exports.createGenre = async () => {

}