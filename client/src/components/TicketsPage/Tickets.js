import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputLabel,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import "./Tickets.css";

function Tickets() {
  const [ticketName, setTicketName] = useState("");
  const [tickets, setTickets] = useState([]);
  const [priority, setPriority] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [viewTicketDialogOpen, setViewTicketDialogOpen] = useState(false);

  const [newTicket, setNewTicket] = useState({
    title: "",
    date: "",
    description: "",
    priority: "",
    location: "",
    image: null,
  });

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setNewTicket({ ...newTicket, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setNewTicket({ ...newTicket, image: event.target.files[0] });
  };

  const handleAddTicket = () => {
    // Add your ticket to the tickets container and close the dialog
    setTickets([...tickets, newTicket]);
    console.log(newTicket);
    handleClose();
  };
  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setViewTicketDialogOpen(true);
  };
  const handleViewTicketDialogClose = () => {
    setSelectedTicket(null);
    setViewTicketDialogOpen(false);
  };

  const isAuthenticated = true;

  return (
    <div className="Tickets">
      <div className="tickets-wrapper">
        <NavBar isAuthenticated={isAuthenticated} isProjectsPage={true} />

        <Box className="tickets-content">
          <Box className="ticket-search-container">
            <TextField
              label="Ticket name"
              variant="outlined"
              className="ticket-search-input"
              value={ticketName}
              onChange={(e) => setTicketName(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl variant="outlined">
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                value={priority}
                onChange={handlePriorityChange}
                label="Priority"
                className="priority-select"
              >
                
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              style={{ backgroundColor: "#F29913", marginLeft: "1rem" }}
            >
              Search
            </Button>
          </Box>

          <Box className="tickets-container">
            {tickets.map((ticket, index) => (
              <div
                key={index}
                className="ticket"
                onClick={() => handleViewTicket(ticket)}
              >
                {ticket.image && (
                  <img
                    src={URL.createObjectURL(ticket.image)}
                    alt={ticket.title}
                    className="ticket-image"
                  />
                )}
                <div className="ticket-info">
                  <h3>{ticket.title}</h3>
                </div>
              </div>
            ))}
          </Box>

          <Fab
            color="primary"
            className="add-ticket-button"
            style={{ backgroundColor: "#F29913" }}
            onClick={handleClickOpen}
          >
            <AddIcon />
          </Fab>
        </Box>

        {/* Add ticket dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create your ticket</DialogTitle>
          <DialogContent className="dialog-content">
            <TextField
              label="Title"
              name="title"
              value={newTicket.title}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Date"
              type="date"
              name="date"
              value={newTicket.date}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={newTicket.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
            />
            <FormControl component="fieldset">
              <InputLabel>Priority</InputLabel>
              <RadioGroup
                name="priority"
                value={newTicket.priority}
                onChange={handleInputChange}
                row
              >
                <FormControlLabel
                  value="High"
                  control={<Radio />}
                  label="High"
                />
                <FormControlLabel
                  value="Medium"
                  control={<Radio />}
                  label="Medium"
                />
                <FormControlLabel value="Low" control={<Radio />} label="Low" />
              </RadioGroup>
            </FormControl>
            <TextField
              label="Location"
              name="location"
              value={newTicket.location}
              onChange={handleInputChange}
              fullWidth
            />
            <InputLabel htmlFor="upload-image">Upload Image</InputLabel>
            <input
              id="upload-image"
              type="file"
              name="image"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="upload-image">
              <Button variant="contained" component="span">
                Choose File
              </Button>
            </label>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              style={{ backgroundColor: "#211E1E", color: "white" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddTicket}
              style={{ backgroundColor: "#F29913", color: "white" }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={viewTicketDialogOpen}
          onClose={handleViewTicketDialogClose}
        >
          <DialogTitle>{selectedTicket?.title}</DialogTitle>
          <DialogContent>
            <p>Date: {selectedTicket?.date}</p>
            <p>Description: {selectedTicket?.description}</p>
            <p>Priority: {selectedTicket?.priority}</p>
            <p>Location: {selectedTicket?.location}</p>
            {selectedTicket?.image && (
              <img
                src={URL.createObjectURL(selectedTicket.image)}
                alt={selectedTicket.title}
                style={{ width: "100%", marginTop: "1rem" }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleViewTicketDialogClose}
              style={{ backgroundColor: "#F29913", color: "white" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Tickets;
