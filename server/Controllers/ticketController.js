const Ticket = require('../Models/ticket');
const Project = require('../Models/projects');
const User = require('../Models/user');



const createTicket = async (req, res) => {
  const { Name, Description, Date, image, Priority, ProjectName, UserName } = req.body;

  try {
    // Check if project name exists in the database
    const existingProject = await Project.findOne({ Name: ProjectName });
    if (!existingProject) {
      return res.status(400).json({ error: 'Project name does not match any existing projects. Please try again with an existing project name.' });
    }

    // Check if user exists in the database
    const existingUser = await User.findOne({ userName: UserName });
    if (!existingUser) {
      return res.status(400).json({ error: 'User not found. Please provide a valid UserName.' });
    }

    const newTicket = new Ticket({
      Name,
      Description,
      Date,
      image,
      Priority,
      ProjectName,
      UserName: existingUser.userName // Set the userName field to the userName of the existing user
    });

    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Get all tickets by projectId
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
