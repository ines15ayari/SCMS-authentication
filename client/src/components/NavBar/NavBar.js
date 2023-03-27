// NavBar.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import "./NavBar.css";

// Add the "isProjectsPage" prop to the NavBar component
const NavBar = ({ isAuthenticated = false, isProjectsPage = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add your logout logic here
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#A4ABB2" }}
      className="app-bar"
    >
      <Toolbar>
        <Typography variant="h6" className="page-title">
          ResolveNow
        </Typography>
        <div className="nav-links-container">
          {/* Only render the "Home" button if the "isProjectsPage" prop is set to false */}
          {!isProjectsPage && (
            <Button
              style={{ color: "black", marginRight: "40px" }}
              component={Link}
              to="/"
              variant="text"
              className="nav-link"
            >
              Home
            </Button>
          )}
          <Button
            style={{ color: "black", marginRight: "40px" }}
            component={Link}
            to="/about"
            variant="text"
            className="nav-link"
          >
            About Us
          </Button>
          {isAuthenticated && isProjectsPage && (
            <>
              <Button
                style={{ color: "black", marginRight: "40px" }}
                component={Link}
                to="/projects"
                variant="text"
                className="nav-link"
              >
                Projects
              </Button>
            </>
          )}
        </div>
        {isAuthenticated && isProjectsPage ? (
          <>
            <AccountCircle
              fontSize="large"
              onClick={handleProfileMenuOpen}
              style={{ cursor: "pointer" }}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              MenuProps={{
                anchorOrigin: { vertical: "bottom", horizontal: "center" },
                transformOrigin: { vertical: "top", horizontal: "center" },
                getContentAnchorEl: null,
              }}
            >
              <MenuItem
                component={Link}
                to="/profile"
                onClick={handleProfileMenuClose}
              >
                Profile
              </MenuItem>
              <MenuItem component={Link} to="/" onClick={handleLogout}>
                Log out
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            component={Link}
            to="/login"
            variant="contained"
            style={{ backgroundColor: "#F29913" }}
            className="sign-in-btn"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
