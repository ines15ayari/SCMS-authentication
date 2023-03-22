import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Navbar from '../NavBar/NavBar';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhoneIcon from '@material-ui/icons/Phone';
import Grid from '@material-ui/core/Grid';
import Image2 from './image2.png'
import './signIn.css'
import axios from 'axios';

function SignIn() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    axios.post('http://localhost:8000/auth//sign-In', {
      userName: userName,
      password: password
    })
    .then((response) => {
      console.log(response);
      // Redirect the user to the projects page
      window.location.href = '/projects';
    })
    .catch((error) => {
      console.log(error);
      // Show an error message to the user
    });
  };
  return (
    <>
    <Navbar />
    <div className="container">
      <img src={Image2} alt="Some image" className="image2" />
      <Box>
        <div className="formContainer">
          <h1>Sign In</h1>
          <TextField
            className="formField"
            label="User Name"
            value={userName} onChange={(e) => setUserName(e.target.value)}
            variant="outlined"
            type="text"
            fullWidth
          />

          <TextField
            className="formField"
            label="Password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            type="password"
            fullWidth
          />
          <Button variant="contained"
            color="primary"className="submitButton"
            onClick={handleSignIn} 
            style={{ backgroundColor: '#F29913', color: '#FFFFFF', width: '100%', margin:"30px 0 0" }}> 
             Sign In
          </Button>      
        </div>
      </Box>
    </div>
  </>
  );
}

export default SignIn;
