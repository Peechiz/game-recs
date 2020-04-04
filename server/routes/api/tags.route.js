const router = require("express").Router();
const Game = require('../../models/game.model');
const TagMetadata = require('../../models/tagMetadata.model');


router.route('/')
  .get(async (req,res) => {
    const tags = await Game.distinct("tags");
    res.json(tags);
  })
  .post(async (req, res) => {
    if (req.body._id){
      TagMetadata.findByIdAndUpdate(req.body._id, req.body, {upsert: true})
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err);
        sendStatus(500);
      })
      // and also change the name of associated games
    } else {
      TagMetadata.create(req.body)
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err);
        sendStatus(500);
      })
    }
  })

router.route('/:tag')
  .get(async (req, res) => {
    const metadata = await TagMetadata.findOne({ name: req.params.tag })
    res.json(metadata)
  })

module.exports = router;
