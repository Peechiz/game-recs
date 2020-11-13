const Game = require('../models/game.model')
const Tags = require('../models/tag.model')

async function convert() {
  const games = await Game.find();
  const tags = await Tags.find();

  console.log(tags.map(t => t.name))

  const updateGames = [];

  const replaceTags = (arr) => arr.map(tagname => tags.find(tag => tag.name === tagname)._id)

  games.forEach(game => {
    updateGames.push(
      Game.findByIdAndUpdate(game._id, {
        tags: replaceTags(game.tags)
      })
    )
  })

  Promise.all(updateGames).then(()=> console.log('tags replaced with indexes'))
    .catch(err => console.log(err))

}

module.exports = convert;