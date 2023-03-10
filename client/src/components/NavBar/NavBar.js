import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './NavBar.css';
import Logo from './Logo.png'
import { Link } from 'react-router-dom';
import signUp from '../SignUp/signUp';


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        
        <Toolbar>
        <img id="Logo"src={Logo} alt="Logo" />
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
          <div class="button-container" >
          <Link to="/Register" >
            <Button class="btn" className="login-button" color="inherit">Sign Up</Button>
          </Link>
          <Link to="/login" >
            <Button class="btn" className="login-button" color="inherit">Sign In</Button>
          </Link>
          </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
}