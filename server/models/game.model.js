const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  game: {},
  review: String,
  tags: [String],
  why: String,
  precision: Number,
  videos: [{ name: String, video_id: String }]
})

module.exports = mongoose.model("Game", GameSchema)

