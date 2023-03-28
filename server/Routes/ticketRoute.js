const express = require('express');
const router = express.Router();
const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById
} = require('../Controllers/ticketController');

// Create a new ticket
router.post('/create', createTicket);

// Get all tickets
router.get('/', getAllTickets);

// Get a ticket by ID
router.get('/:id', getTicketById);

// Update a ticket
router.put('/:id', updateTicketById);

// Delete a ticket
router.delete('/:id', deleteTicketById);

module.exports = router;
