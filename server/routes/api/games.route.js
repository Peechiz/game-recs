const router = require("express").Router();
const Game = require('../../models/game.model')

router.route('/')
  .post(async (req, res) => {
    // console.log(JSON.stringify(req.body))
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
  .get(async (req, res) => {
    Game.find()
      .then(games => res.json(games))
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

module.exports = router;
