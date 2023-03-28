const Ticket = require('../Models/ticket')

//Add a new Ticket
const createTicket = async (req, res) => {
    const { Name, Description, Date, image, Priority } = req.body;
  
    try {
      const newTicket = new Ticket({
        Name,
        Description,
        Date,
        image,
        Priority
      });
  
      await newTicket.save();
      res.status(201).json(newTicket);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  // Get all tickets
const getAllTickets = async (req, res) => {
    try {
      const tickets = await Ticket.find();
      res.json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }

// Get ticket by ID
const getTicketById = async (req, res) => {
    const ticketId = req.params.id;
    try {
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ msg: 'Ticket not found' });
      }
      res.json(ticket);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }

  // Update ticket by ID
const updateTicketById = async (req, res) => {
    const ticketId = req.params.id;
    const { Name, Description, Date, image, Priority } = req.body;
  
    try {
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ msg: 'Ticket not found' });
      }
  
      ticket.Name = Name;
      ticket.Description = Description;
      ticket.Date = Date;
      ticket.image = image;
      ticket.Priority = Priority;
      await ticket.save();
      res.json(ticket);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }

  // Delete ticket by ID
const deleteTicketById = async (req, res) => {
    const ticketId = req.params.id;
    try {
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        return res.status(404).json({ msg: 'Ticket not found' });
      }
      await ticket.remove();
      res.json({ msg: 'Ticket deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  
  module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicketById,
    deleteTicketById
  };
