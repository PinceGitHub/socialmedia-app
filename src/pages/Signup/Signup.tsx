import { Container, Wrapper } from "./Signup.style";
import { Avatar, Stack, TextField, Button } from "@mui/material";
import { AppRegistration } from "@mui/icons-material";

const Signup = () => {
  return (
    <Container>
      <Wrapper>
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <AppRegistration />
        </Avatar>
        <Stack
          direction="column"
          component="form"
          width="100%"
          autoComplete="on"
        >
          <TextField
            label="First Name"
            id="firstName"
            name="firstName"
            margin="normal"
            required
            fullWidth
            variant="standard"
            type="text"
            autoFocus
            inputProps={{ minLength: 3, maxLength: 20 }}
          />
          <TextField
            label="Last Name"
            id="lastName"
            name="lastName"
            margin="normal"
            required
            fullWidth
            variant="standard"
            type="text"
            inputProps={{ minLength: 3, maxLength: 20 }}
          />
          <TextField
            label="Email Address"
            id="email"
            name="email"
            margin="normal"
            required
            fullWidth
            variant="standard"
            type="email"
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            margin="normal"
            required
            fullWidth
            variant="standard"
            inputProps={{ minLength: 6, maxLength: 20 }}
          />
          <TextField
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            margin="normal"
            required
            fullWidth
            variant="standard"
            inputProps={{ minLength: 6, maxLength: 20 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: "50px" }}
          >
            Sign Up
          </Button>
        </Stack>
      </Wrapper>
    </Container>
  );
};

export default Signup;
