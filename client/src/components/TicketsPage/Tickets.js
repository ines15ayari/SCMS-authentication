import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  Grid,
  Fab,
  Paper,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  OutlinedInput,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import NavBar from "../NavBar/NavBar";
import "./Tickets.css";

function Tickets({ projectName }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketPriority, setTicketPriority] = useState("");
  const [ticketLocation, setTicketLocation] = useState("");
  const [ticketImage, setTicketImage] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleTicketImageChange = (event) => {
    setTicketImage(event.target.files[0]);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const [priority, setPriority] = useState("");

  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const handleCreateTicket = () => {
    if (
      !ticketTitle ||
      !ticketDescription ||
      !ticketLocation ||
      !ticketPriority
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const newTicket = {
      id: new Date().getTime(),
      title: ticketTitle,
      description: ticketDescription,
      priority: ticketPriority,
      location: ticketLocation,
      image: ticketImage,
    };

    setTickets([...tickets, newTicket]);
    setOpenDialog(false);
    setErrorMessage("");
  };

  const renderTickets = () => {
    return tickets.map((ticket) => (
      <Box
        key={ticket.id}
        className="ticket-box"
        border="1px solid #000"
        borderRadius="5px"
        padding="15px"
        margin="10px"
        width="200px"
        height="250px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        onClick={() => handleTicketClick(ticket)}
        style={{ cursor: "pointer" }}
      >
        {ticket.image && (
          <img
            src={URL.createObjectURL(ticket.image)}
            alt={ticket.title}
            width="100%"
            height="200px"
            objectFit="cover"
          />
        )}
        <Box display="flex" alignItems="center" marginTop="10px">
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: getPriorityColor(ticket.priority),
              marginRight: "5px",
            }}
          ></div>
          <h4 style={{ fontWeight: "bold" }}>{ticket.title}</h4>
        </Box>
      </Box>
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "yellow";
      default:
        return "transparent";
    }
  };

  return (
    <div className="Tickets">
      <NavBar isAuthenticated={true} isProjectsPage={true} />

      <Paper className="content-paper">
        <Box className="search-controls-container" marginBottom={3}>
          <TextField
            label="Search Tickets"
            variant="outlined"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Select
            value={priority}
            onChange={handlePriorityChange}
            className="priority-dropdown"
            displayEmpty
          >
            <MenuItem value="" disabled>
              Priority
            </MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
          <Select
            value={status}
            onChange={handleStatusChange}
            className="status-dropdown"
            displayEmpty
          >
            <MenuItem value="" disabled>
              Status
            </MenuItem>
            <MenuItem value="Solved">Solved</MenuItem>
            <MenuItem value="Unsolved">Unsolved</MenuItem>
          </Select>
          <Button
            variant="contained"
            className="search-button"
            onClick={() => console.log("Search clicked")}
            sx={{
              backgroundColor: "#F29913",
              fontWeight: "bold",
              textTransform: "none",
              color: "white",
              borderRadius: "5px",
              padding: "5px 10px",
              "&:hover": {
                backgroundColor: "#D1870D",
              },
            }}
          >
            Search
          </Button>
        </Box>

        <Box
          className="tickets-container"
          marginBottom={3}
          display="flex"
          flexWrap="wrap"
        >
          {renderTickets()}
        </Box>

        <Box
          display="flex"
          justifyContent="flex-end"
          marginRight={2}
          marginBottom={2}
        >
          <Fab
            color="primary"
            aria-label="add"
            className="add-ticket-button"
            onClick={handleOpenDialog}
            sx={{
              backgroundColor: "#F29913",
              "&:hover": {
                backgroundColor: "#D1870D",
              },
            }}
          >
            <AddIcon />
          </Fab>
          <Dialog
            open={!!selectedTicket}
            onClose={() => setSelectedTicket(null)}
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle>{selectedTicket?.title}</DialogTitle>
            <DialogContent>
              <Box display="flex" flexDirection="column" gap="15px">
                <h4>
                  Date created:{" "}
                  {selectedTicket && formatDate(selectedTicket.id)}
                </h4>
                <p>Description: {selectedTicket?.description}</p>
                <p>Priority: {selectedTicket?.priority}</p>
                <p>Location: {selectedTicket?.location}</p>
                {selectedTicket?.image && (
                  <img
                    src={URL.createObjectURL(selectedTicket.image)}
                    alt={selectedTicket.title}
                    width="50%"
                    height="auto"
                  />
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedTicket(null)}>Close</Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openDialog}
            onClose={() => {
              handleCloseDialog();
              setErrorMessage("");
            }}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Create Ticket</DialogTitle>
            <DialogContent>
              {errorMessage && (
                <Typography color="error" align="center" gutterBottom>
                  {errorMessage}
                </Typography>
              )}
              <Box
                component="form"
                noValidate
                autoComplete="off"
                display="flex"
                flexDirection="column"
                gap="15px"
                paddingBottom="15px"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography noWrap={false} variant="subtitle1">
                      Title
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      id="ticket-title"
                      variant="outlined"
                      value={ticketTitle}
                      onChange={(e) => setTicketTitle(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography noWrap={false} variant="subtitle1">
                      Description
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      id="ticket-description"
                      multiline
                      rows={4}
                      variant="outlined"
                      value={ticketDescription}
                      onChange={(e) => setTicketDescription(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography noWrap={false} variant="subtitle1">
                      Location
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      id="ticket-location"
                      variant="outlined"
                      value={ticketLocation}
                      onChange={(e) => setTicketLocation(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography noWrap={false} variant="subtitle1">
                      Priority
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <FormControl component="fieldset">
                      <Box display="flex" alignItems="center" gap="10px">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={ticketPriority === "High"}
                              onChange={(e) =>
                                setTicketPriority(
                                  e.target.checked ? "High" : ""
                                )
                              }
                            />
                          }
                          label="High"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={ticketPriority === "Medium"}
                              onChange={(e) =>
                                setTicketPriority(
                                  e.target.checked ? "Medium" : ""
                                )
                              }
                            />
                          }
                          label="Medium"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={ticketPriority === "Low"}
                              onChange={(e) =>
                                setTicketPriority(e.target.checked ? "Low" : "")
                              }
                            />
                          }
                          label="Low"
                        />
                      </Box>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography noWrap={false} variant="subtitle1">
                      Add Image
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <FormControl variant="outlined" component="fieldset">
                      <OutlinedInput
                        id="ticket-image"
                        type="file"
                        onChange={handleTicketImageChange}
                        startAdornment={
                          <InputAdornment position="start">
                            <ImageIcon />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Button
                    onClick={handleCloseDialog}
                    style={{
                      backgroundColor: "#211E1E",
                      fontWeight: "bold",
                      textTransform: "none",
                      color: "white",
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleCreateTicket}
                    style={{
                      backgroundColor: "#F29913",
                      fontWeight: "bold",
                      textTransform: "none",
                      color: "white",
                    }}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
        </Box>
      </Paper>
    </div>
  );
}

export default Tickets;
