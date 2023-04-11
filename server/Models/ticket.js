const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
  Priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    required: true,
  },
  Image: {
    type: String,
  },
  ProjectName: {
    type: String,
    required: true,
  },
  UserName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Ticket', ticketSchema);
