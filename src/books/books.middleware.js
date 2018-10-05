const bookController = require("./book.controller");

exports.findBooks = async function(req, res, next) {
  let limit = 50;
  let page = 1;
  let sort = "";
  let filters = {};

  if (req.query.limit) {
    let queryLimit = Number(req.query.limit);
    if (!isNaN(queryLimit) && queryLimit >= 0 && queryLimit < 100) {
      limit = queryLimit;
    }
  }

  if (req.query.page) {
    let queryPage = Number(req.query.page);
    if (!isNaN(queryPage) && queryPage >= 1) {
      page = queryPage;
    }
  }

  if (req.query.author) {
    filters.author = req.query.author;
  }

  if (req.query.title) {
    filters.$text = { $search: req.query.title };
  }

  if (req.query.summary) {
    filters.$text = { $search: req.query.summary };
  }

  if (req.query.genre) {
    filters.$text = { $search: req.query.genre }
  }

  if (req.query.sort) {
    sort = req.query.sort;
  }

  const books = await bookController.bookList(limit, page, filters, sort);
  res.json(books);
};

exports.createBook = async function(req, res, next) {
  let body = req.body;
  if (!body.title || !body.isbn || !body.author || !body.summary) {
    // error
    return next(new Error("Error"));
  }

  /* if (body.genre && !Array.isArray(body.genre)) {
    // error
    return next(new Error("Hola"));
  } */

  let bodyGenre;
  if (body.genre && Array.isArray(body.genre)) {
    bodyGenre = body.genre;
  }
  if (body.genre && typeof body.genre === 'string') {
    bodyGenre = [];
    bodyGenre.push(body.genre);
  }
  else if (body.genre && !Array.isArray(body.genre)) {
    return next(new Error("Error: genre is not valid."));
  }

  const payload = {
    title: body.title,
    isbn: body.isbn,
    author: body.author,
    genre: bodyGenre || [],
    summary: body.summary
  };
  try {
    const book = await bookController.createBook(payload);
    res.json(book);
  } catch (err) {
    next(err);
  }
};
