const mongoose = require('mongoose')
const ticketSchema = mongoose.Schema({
  Name : {
    type: String,
    required: true,
  },
  Description : {
    type: String,
    required: true,
  },
  Date : {
    type: Date,
    required: true,
  },
  Priority: {
    type: String,
    enum: ["high", "medium", "low"],
    required: true,
  },
  image: {
    type: String,
  }
})

module.exports = mongoose.model('ticket', ticketSchema)