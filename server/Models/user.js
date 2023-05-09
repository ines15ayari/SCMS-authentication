const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  tickets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
  }],
  ticketsByProject: [{
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    count: {
      type: Number,
      default: 0,
    },
  }],
});

module.exports = mongoose.model('User', userSchema);
