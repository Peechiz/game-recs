const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  game: {},
  review: String,
  tags: [String]
})

module.exports = mongoose.model("Game", GameSchema)

