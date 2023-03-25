import React from 'react'
import './Home.css';
import Navbar from '../NavBar/NavBar';
import { Button } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';
import image1 from './image1.png'

 

function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <div className="home-page-content"style={{ fontFamily: 'imprima, sans-serif', color:"black" }}>
        <h1>Welcome!</h1>
        <p>Our platform makes it easy to track, resolve, and respond to customer complaints. Sign up today and start managing your complaints like a pro!</p>
        <br/>
        <Link to="/login">
          <Button variant="contained" sx={{ backgroundColor: "#F29913", color: "white", borderRadius: "30px", padding: "10px 25px", textDecoration:"none"}}>
           Get Started <ArrowRightAltIcon sx={{ marginLeft: "10px" }} />
          </Button>
        </Link>
      </div>


      <img id="image1" src={image1} alt="My Image" />
      
    </div>
  )
}

export default Home