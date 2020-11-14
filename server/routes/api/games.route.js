const router = require("express").Router();
const { create } = require("../../models/game.model");
const Game = require('../../models/game.model')
const Tag = require('../../models/tag.model')

router.route('/')
  .post(async (req, res) => {

    let { tags } = req.body;
    const tagsToCreate = []
    const tagIDs = tags.filter(tag => typeof tag === 'string')

    tags.filter(tag => typeof tag !== 'string')
      .forEach(tag => {
        tagsToCreate.push(
          Tag.create({ name: tag.name})
        )
      })
    
    const created = await Promise.all(tagsToCreate);
    created.forEach(newTag => tagIDs.push(newTag._id))

    req.body.tags = tagIDs;

    if (req.body._id) {
      Game.findByIdAndUpdate(req.body._id, req.body, {upsert: true})
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err);
        sendStatus(500);
      })
    } else {
      Game.create(req.body)
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err);
        sendStatus(500);
      })
    }    
  })
  .get((req, res) => {
    Game.find()
      .then( async (games) => {
        res.json(games)
      })
      .catch(err => res.json({ message: err }));
  })

  router.route('/:id')
    .delete(async (req, res) => {
      Game.findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => {
          console.log(err);
          sendStatus(500);
        })
    })
    .get(async (req, res) => {
      Game.findById(req.params.id)
        .then(entry => res.send(entry))
        .catch(err => {
          console.log(err);
          sendStatus(500);
        })
    })

module.exports = router;
