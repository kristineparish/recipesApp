const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/recipes', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const recipes = require("./recipes.js");
app.use("/api/recipes", recipes);

const users = require("./users.js");
app.use("/api/users", users);

app.listen(3000, () => console.log('Server listening on port 3000!'));