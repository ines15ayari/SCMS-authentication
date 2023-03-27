import React from "react";
import "./Home.css";
import Navbar from "../NavBar/NavBar";
import { Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";
import image1 from "./Image1.png";

function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <div
        className="home-page-content"
        style={{ fontFamily: "imprima, sans-serif", color: "black" }}
      >
        <h1>Welcome!</h1>
        <p>
          Our platform makes it easy to track, resolve, and respond to customer
          complaints. Sign up today and start managing your complaints like a
          pro!
        </p>
        <br />

        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{
            backgroundColor: "#F29913",
            "&:hover": { backgroundColor: "#d6890f" },
          }}
        >
          Get Started
        </Button>
      </div>

      <img id="image1" src={image1} alt="My Image" />
    </div>
  );
}

export default Home;
