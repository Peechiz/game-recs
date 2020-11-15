const router = require("express").Router();

const searchRoute = require('./search.route')
const videoRoute = require('./video.route')
const gameRoute = require("./games.route")
const tagsRoute = require('./tags.route')
const updateGameByID = require('./updateGameByID.route')
const auth = require('./login.route')
const k_route = require('./k.route')

function apiRoutes(app) {
  router.use("/search", searchRoute(app));
  router.use('/video', videoRoute(app))
  router.use('/games', gameRoute);
  router.use('/tags', tagsRoute);
  router.use('/updateGame', updateGameByID);
  router.use('/auth', auth);
  router.use('/k', k_route)
  return router;
}

module.exports = apiRoutes;