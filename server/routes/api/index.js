const router = require("express").Router();

const gameRoute = require("./games.route")
const searchRoute = require('./search.route')
const tagsRoute = require('./tags.route')
const updateGameByID = require('./updateGameByID.route')
const auth = require('./login.route')

function apiRoutes(app) {
  router.use("/search", searchRoute(app));
  router.use('/games', gameRoute);
  router.use('/tags', tagsRoute);
  router.use('/updateGame', updateGameByID);
  router.use('/auth', auth);
  return router;
}

module.exports = apiRoutes;