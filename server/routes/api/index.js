const router = require("express").Router();

const gameRoute = require("./games.route")
const searchRoute = require('./search.route')
const tagsRoute = require('./tags.route')
const updateGameByID = require('./updateGameByID.route')
const auth = require('./login.route')

router.use("/search", searchRoute);
router.use('/games', gameRoute);
router.use('/tags', tagsRoute);
router.use('/updateGame', updateGameByID);
router.use('/auth', auth);

module.exports = router;