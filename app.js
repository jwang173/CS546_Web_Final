const express = require('express');
const bodyParser = require("body-parser");
const morgan = require('morgan'); // small library for our logger
const mainRouter = require('./routes');
const exphbs = require("express-handlebars");
const allRouter = require('./routes');

const app = express();

// Middlewares Here
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(morgan('dev')); // helper for logging our routes to the console

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");



// Add API routes
app.use(allRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server Listening on localhost:3000');
});
