const Ticket = require('../Models/ticket');

// Add a new Ticket
const createTicket = async (req, res) => {
  const { Name, Description, Date, image, Priority, project } = req.body;

  try {
    const newTicket = new Ticket({
      Name,
      Description,
      Date,
      image,
      Priority,
      project
    });

    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

//Get ALL tickets for a given project
const getAllTickets = async (req, res) => {
  const { page = 1, limit = 10, projectId } = req.query;

  try {
    const query = { project: projectId };
    const tickets = await Ticket.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Ticket.countDocuments(query);

    res.json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      tickets
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


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
    res.status(500).json({ error: 'Server error' });
  }
};

// Update ticket by ID
const updateTicketById = async (req, res) => {
  const ticketId = req.params.id;
  const { Name, Description, Date, image, Priority, project } = req.body;

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
    ticket.project = project;
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

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
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById
};
