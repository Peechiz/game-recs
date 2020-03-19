const router = require("express").Router();
const Game = require('../../models/game.model')


router.route('/')
  .get(async (req,res) => {
    const tags = await Game.distinct("tags");
    res.json(tags);
  })

module.exports = router;
