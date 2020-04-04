const mongoose = require('mongoose');

const TagMetadataSchema = new mongoose.Schema({
  name: String,
  icon: String,
  definition: String,
})

module.exports = mongoose.model("TagMetadata", TagMetadataSchema)

