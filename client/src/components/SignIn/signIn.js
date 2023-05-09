import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Navbar from "../NavBar/NavBar";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./signIn.css";
import axios from "axios";
import image2 from "./image2.png";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    document.body.classList.add("no-scrollbar");
    return () => {
      document.body.classList.remove("no-scrollbar");
    };
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    window.location.href = "/forgot-password";
  };

  const handleSignIn = () => {
    axios
      .post("http://localhost:8000/auth/sign-In", {
        userName: userName,
        password: password,
      })
      .then((response) => {
        console.log(response);
        // Redirect the user to the projects page
        window.location.href = "/projects";
      })
      .catch((error) => {
        console.log(error);
        const errorMsg = "Wrong User name or Password. Please Try Again.";
        setError(errorMsg);
      });
  };

  return (
    <>
      <Navbar isSignInPage={true} />

      <div className="wrapper">
        <img src={image2} alt="Some image" className="image2" />
        <div className="container">
          <Box>
            <Paper padding={1} elevation={5} className="formPaper">
              <div className="formContainer">
                <h1>Sign In</h1>
                <div className="textFieldContainer">
                  <TextField
                    className="formField"
                    label="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    variant="outlined"
                    type="text"
                    fullWidth
                  />
                </div>
                <div className="textFieldContainer">
                  <TextField
                    className="formField"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                {error && <p className="errorMsg">{error}</p>}
                <Button
                variant="contained"
                color="primary"
                className="submitButton"
                onClick={handleSignIn}
                style={{
                  textTransform: "none",
                  backgroundColor: "#F29913",
                  color: "#FFFFFF",
                  width: "100%",
                  margin: "30px 0 0",
                }}
              >
                Sign In
              </Button>
              <Button
                color="primary"
                className="forgotPasswordButton"
                onClick={handleForgotPassword}
                style={{
                  textTransform: "none",
                  color: "#F29913",
                  width: "100%",
                  margin: "10px 0 0",
                }}
              >
                Forgot Password?
              </Button>
              </div>
            </Paper>
          </Box>
        </div>
      </div>
    </>
  );
}

export default SignIn;
