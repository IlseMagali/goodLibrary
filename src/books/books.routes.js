const express = require("express");
const router = express.Router();

// Require controllers
const middleware = require("./books.middleware");

router.get("/", middleware.findBooks);
router.post('/', middleware.createBook);

/* router.get('/book/:id');

router.get('/books');

router.delete('/book/:id');

router.put('/book/:id'); */

module.exports = router;
