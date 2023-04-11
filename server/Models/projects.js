const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  tickets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
  }],
  ticketsByUser: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    count: {
      type: Number,
      default: 0,
    },
  }],
});

module.exports = mongoose.model('Project', projectSchema);
