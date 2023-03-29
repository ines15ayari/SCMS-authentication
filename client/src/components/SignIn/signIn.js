import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Navbar from "../NavBar/NavBar";
import Box from "@material-ui/core/Box";
import "./signIn.css";
import axios from "axios";
import image2 from "./image2.png";

function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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
      <div className="container">
        <img src={image2} alt="Some image" className="image2" />
        <Box>
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
                type="password"
                fullWidth
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
          </div>
        </Box>
      </div>
    </>
  );
}

export default SignIn;
