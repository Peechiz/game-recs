const express = require("express");
let app = express();
const Mongoose = require('mongoose');
const config = require('./config/db');
const routes = require("./routes");
require("dotenv").config();
const getToken = require('./routes/util/igdb.oath');
const moment = require('moment');
const convert = require('./scripts/convertTags')

getToken().then(token => {
  app.locals.token = token;
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const refreshToken = async function (req, res, next) {
  const { moment_expires } = app.locals.token;
  if (moment().isAfter(moment_expires)) {
    console.log('Refreshing IGDB API token.')
    app.locals.token = await getToken();
  }
  next()
}

app.use(refreshToken)

app.use('/', routes(app))

Mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
let db = Mongoose.connection;

const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  console.log('serving on ' + PORT)
})