import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './NavBar.css';

import { Link } from 'react-router-dom';


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        
        <Toolbar>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Inter, sans-serif', color: 'black',fontWeight:"bold", marginLeft:"20px" }}>
            ResolveNow
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' , marginRight:"400px", fontWeight:"bold"}}>
            <Link to="/" style={{ textDecoration: 'none', color: 'black', fontFamily: 'Inter, sans-serif', marginRight: '80px' }}>
              Home
            </Link>
            <Link to="/about" style={{ textDecoration: 'none', color: 'black', fontFamily: 'Inter, sans-serif' }}>
              About Us
            </Link>
          </Box>
          <div className="button-container" >
          <Link to="/login" >
            <Button className='btn' className="login-button" color="inherit">Sign In</Button>
          </Link>
          </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
}