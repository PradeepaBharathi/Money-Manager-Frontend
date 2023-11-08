import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import "./account.css"
import { useGlobalContext } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";
function Account() {
  const { addUser, loginUserid, setDetails, signupUser, setSignupUser } =
    useGlobalContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, toggleAccount] = useState("login");
  const [loginid, setLoginid] = useState("");
  const [loginemail, setLoginemail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const handleSignup = () => {
    if (!name || !email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setMessage("Password must have atleast 8 characters");
      return;
    }
    setSignupUser(email);
    addUser(name, email, password);
    alert("signed in successfully");
    toggleSignup("login");
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUserid(loginid, loginemail, loginPassword);
      console.log(response);
    
      localStorage.setItem("token", response.data.token);

      setDetails({ email: response.data.email, name: response.data.name });

      
      alert("user logged in");
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Incorrect email or password");
        setError("Incorrect email or password.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="account-container">
    <h1>My Money</h1>
    <Box className="image">
    
      {account === "login" ? (
        <Box className="details">
          <TextField
            id="filled-basic"
            label=" email"
            variant="standard"
            name="loginemail"
            value={loginemail}
            onChange={(e) => setLoginemail(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Password"
            type="password"
            name="loginPassword"
            variant="standard"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <Button id="login-button" variant="contained" onClick={loginUser}>
            Login
          </Button>
          <Typography id="text" variant="h5">
            OR
          </Typography>
          <Button
            id="sign-up"
            variant="outlined"
            onClick={() => toggleSignup()}
          >
            Create An Account
          </Button>
          {error && <p id="error-message">{error}</p>}
        </Box>
      ) : (
        <Box className="details">
          <TextField
            id="filled-basic"
            onChange={(e) => setName(e.target.value)}
            name="Name"
            inputProps={{
              type: "text",
              className: "no-hover",
            }}
            label=" Enter Your Name"
            variant="standard"
          />
          <TextField
            id="filled-basic"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            inputProps={{
              type: "text",
              className: "no-hover",
            }}
            label=" email"
            variant="standard"
          />
          <TextField
            id="filled-basic"
            onChange={(e) => setPassword(e.target.value)}
            name="Password"
            inputProps={{
              type: "password",
              className: "no-hover",
            }}
            label="Password"
            variant="standard"
          />
          <Button id="login-button" variant="contained" onClick={handleSignup}>
            Signup
          </Button>
          <Typography id="text" variant="h5">
            OR
          </Typography>
          <Button
            id="sign-up"
            variant="outlined"
            onClick={() => toggleSignup()}
          >
            Already Have An Account
          </Button>
          <p id="message">{message}</p>
          {error && <p id="error-message">{error}</p>}
        </Box>
      )}
      </Box>
      </div>
  );
}

export default Account;
