const express = require("express");
let app = express();
const Mongoose = require('mongoose');
const config = require('./config/db');
const routes = require("./routes");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes)

Mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
let db = Mongoose.connection;

const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  console.log('serving on ' + PORT)
})