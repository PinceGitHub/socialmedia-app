import { Container, Wrapper } from "./Signin.style";
import { Avatar, Stack, TextField, Button } from "@mui/material";
import { Lock } from "@mui/icons-material";

const Signin = () => {
  return (
    <Container>
      <Wrapper>
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <Lock />
        </Avatar>
        <Stack
          direction="column"
          component="form"
          width="100%"
          autoComplete="on"
        >
          <TextField
            label="Email Address"
            id="email"
            name="email"
            margin="normal"
            required
            fullWidth
            autoFocus
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: "50px" }}
          >
            Sign In
          </Button>
        </Stack>
      </Wrapper>
    </Container>
  );
};

export default Signin;
