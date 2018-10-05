const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");

const books = require("./src/books/books.routes");

// Set up mongoose connection
var mongoose = require("mongoose");
var databaseUrl =
  "mongodb://ikeymolen:ikeymolen1992@ds153841.mlab.com:53841/local_library_ik";
var mongoDB = process.env.MONGODB_URI || databaseUrl;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/books", books);

app.listen(port, () => console.log(`Server listening on port: ${port}`));

module.exports = app;
