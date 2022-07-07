import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import { TextField, Button } from "@mui/material";
import { AppBar } from "@mui/material";
import { Typography } from "@mui/material";
import { users } from "../features/counter/users";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState(null);
  const [pass, setPass] = useState(null);
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  function checkUser() {
    const usernameFound = users.filter((found) => found.user === user);
    if (usernameFound[0].pass === pass) {
      setLogged(true);
      localStorage.setItem("logged", true);
      navigate("/");
    } else setLogged(false);
  }

  return (
    <>
      <AppBar position="static" color="error">
        <Typography variant="h4" component="div" align={"center"} m={2}>
          Login to order
        </Typography>
      </AppBar>
      {!localStorage.getItem("logged") && (
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "150px",
            }}
          >
            <TextField
              required
              id="outlined-required"
              label="Email"
              sx={{ marginBottom: "15px" }}
              onChange={(e) => setUser(e.target.value)}
            />
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPass(e.target.value)}
              sx={{ marginBottom: "15px" }}
            />

            <Button variant="contained" color="error" onClick={() => checkUser()}>
              Login
            </Button>
          </Box>
        </Container>
      )}
      {localStorage.getItem("logged") && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "150px",
          }}
        >
          <Typography variant="h4" component="div" m={2}>
            Already logged in
          </Typography>
          <Button variant="contained" color="error" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Box>
      )}
    </>
  );
}

export default Login;
