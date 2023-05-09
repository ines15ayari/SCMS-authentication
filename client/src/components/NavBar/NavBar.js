import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import profilePicture from './profilePic.png';
import "./NavBar.css";

// Add the "isProjectsPage" prop to the NavBar component
const NavBar = ({
  isAuthenticated = false,
  isProjectsPage = false,
  isHomePage = false,
  isSignInPage = false,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#A4ABB2" }}
      className="app-bar"
    >
      <Toolbar>
        <Typography
          variant="h6"
          className="page-title"
          style={{ fontWeight: "bold" }}
        >
          ResolveNow
        </Typography>

        <div className="nav-links-container">
          {/* Only render the "Home" button if the "isProjectsPage" prop is set to false */}
          {!isProjectsPage && (
            <Button
              style={{
                color: isHomePage ? "white" : "black",
                textTransform: "none",
                marginRight: "40px",
                fontWeight: "bold",
                fontFamily: "",
              }}
              component={Link}
              to="/"
              variant="text"
              className="nav-link"
              disabled={isHomePage}
            >
              Home
            </Button>
          )}
          <Button
            style={{ color: "black", marginRight: "40px",  textTransform: "none", fontWeight: "bold" }}
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
                style={{
                  color: isProjectsPage ? "white" : "black",
                  textTransform: "none",
                  marginRight: "40px",
                  fontWeight: "bold",
                }}
                component={Link}
                to="/projects"
                variant="text"
                className="nav-link"
                disabled={isProjectsPage}
              >
                Projects
              </Button>
            </>
          )}
        </div>
        {isAuthenticated && isProjectsPage ? (
          <>
              <Avatar
              alt="Mohab Alfarra"
              src={profilePicture}
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
            disabled={isSignInPage}
            component={Link}
            to="/login"
            variant="contained"
            style={{
              backgroundColor: "#F29913",
              fontWeight: "bold",
              textTransform: "none",
              color: isSignInPage ? "#BFBFBF" : "white",
            }}
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
