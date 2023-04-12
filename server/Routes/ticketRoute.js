const express = require('express');
const router = express.Router();
const {
  createTicket,
  getAllTickets,
  getTicketByName,
  updateTicketByName,
  deleteTicketByName
} = require('../Controllers/ticketController');

// Create a new ticket
router.post('/create', createTicket);

// Get all tickets by project name
router.get('/:projectName', getAllTickets);

// Get a ticket by name for a specific project
router.get('/:projectName/:ticketName', getTicketByName);

// Update ticket by Name for a specific Project Name
router.put('/:projectName/:name', updateTicketByName);

// Delete ticket by Name for a specific Project Name
router.delete('/:projectName/:name', deleteTicketByName);

module.exports = router;
