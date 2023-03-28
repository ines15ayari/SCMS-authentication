const mongoose = require('mongoose')
const projectSchema = mongoose.Schema({
  Name : {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('project', projectSchema)