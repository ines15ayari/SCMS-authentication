const Ticket = require('../Models/ticket');
const Project = require('../Models/projects');
const User = require('../Models/user');


//Add a new ticket in a project
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

// Get all tickets by project name
const getAllTickets = async (req, res) => {
  const projectName = req.params.projectName;

  try {
    const query = { ProjectName: projectName };
    const tickets = await Ticket.find(query).exec();

    res.json({
      tickets
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a ticket by its name for a specific project
const getTicketByName = async (req, res) => {
  const { projectName, ticketName } = req.params;

  try {
    const ticketNameRegex = new RegExp(`^${ticketName}`, 'i'); // Case-insensitive search for tickets starting with ticketName
    const tickets = await Ticket.find({ ProjectName: projectName, Name: { $regex: ticketNameRegex } });

    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ error: 'No matching tickets found' });
    }

    res.json(tickets);
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

// Update ticket by Name for a specific Project Name
const updateTicketByName = async (req, res) => {
  const projectName = req.params.projectName;
  const ticketName = req.params.name;
  const { Name, Description, Date, image, Priority } = req.body;

  try {
    const ticket = await Ticket.findOne({ Name: ticketName, ProjectName: projectName });
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
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete ticket by Name for a specific Project Name
const deleteTicketByName = async (req, res) => {
  const projectName = req.params.projectName;
  const ticketName = req.params.name;

  try {
    const ticket = await Ticket.findOne({ Name: ticketName, ProjectName: projectName });
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
  getTicketByName,
  getTicketById,
  updateTicketByName,
  deleteTicketByName
};
