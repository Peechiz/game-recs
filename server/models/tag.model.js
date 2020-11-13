const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: String,
  icon: String,
  definition: String,
})

module.exports = mongoose.model("Tag", TagSchema)

