import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Navbar from '../NavBar/NavBar';
import './signUp.css'

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
  },
  formField: {
    margin: theme.spacing(1),
    width: '100%',
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <div className={classes.formContainer} sx={{width:"408px"}}>
        <TextField
          className={classes.formField}
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
        />
        <TextField
          className={classes.formField}
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
        />
        <TextField
          className={classes.formField}
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
        />
        <Button
          className={classes.submitButton}
          variant="contained"
          color="primary"
          fullWidth
        >
          Sign Up
        </Button>
      </div>
    </>
  );
}

export default SignUp;
