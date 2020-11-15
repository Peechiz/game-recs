const router = require("express").Router();
const Game = require('../../models/game.model');
const Tag = require('../../models/tag.model');


router.route('/')
  .get(async (req,res) => {
    const tags = await Tag.find();
    res.json(tags);
  })
  .post(async (req, res) => {
    if (req.body._id) {
      Tag.findByIdAndUpdate(req.body._id, req.body, {upsert: true})
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      })
    } else {
      Tag.create(req.body)
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      })
    }
  })

router.route('/:tag')
  .get(async (req, res) => {
    const tag = await Tag.findOne({ name: req.params.tag })
    res.json(tag)
  })

module.exports = router;
