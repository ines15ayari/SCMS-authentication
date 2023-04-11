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

// Get all tickets by projectId
router.get('/:projectId', getAllTickets);

// Get a ticket by ID
router.get('/:id', getTicketById);

// Update a ticket by ID
router.put('/:id', updateTicketById);

// Delete a ticket by ID
router.delete('/:id', deleteTicketById);

module.exports = router;
