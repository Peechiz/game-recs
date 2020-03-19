const router = require("express").Router();

const gameRoute = require("./games.route")
const searchRoute = require('./search.route')
const tagsRoute = require('./tags.route')

router.use("/search", searchRoute);
router.use('/games', gameRoute);
router.use('/tags', tagsRoute);

module.exports = router;