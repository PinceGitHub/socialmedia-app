import { Container, Wrapper } from "./Signup.style";
import { Avatar, Stack, TextField, Button } from "@mui/material";
import { AppRegistration } from "@mui/icons-material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appUrls, serviceUrls } from "../../utils/app-utils";
import { axiosPrivate } from "../../utils/axios-utils";
import useLoader from "../../hooks/useLoader";
import useSnackbar from "../../hooks/useSnackbar";

const Signup = () => {
  const navigate = useNavigate();
  const showLoader = useLoader();
  const snackbar = useSnackbar();

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (state.password.trim() !== state.confirmPassword.trim()) {
        const confirmPwdInputElem: any =
          e.currentTarget.elements.namedItem("confirmPassword");

        if (confirmPwdInputElem) {
          confirmPwdInputElem.focus();
        }

        snackbar({
          show: true,
          messageType: "error",
          message: "The password and confirmed passwords do not match.",
        });
      } else {
        showLoader(true);

        await axiosPrivate({
          url: serviceUrls.auth.register.path,
          method: serviceUrls.auth.register.method,
          data: {
            firstName: state.firstName.trim(),
            lastName: state.lastName.trim(),
            email: state.email.trim(),
            password: state.password.trim(),
          },
        });

        navigate(appUrls.signIn);
      }
    } catch (error: any) {
      snackbar({
        show: true,
        messageType: "error",
        message: error.response?.data?.message || error.message,
      });
    } finally {
      showLoader(false);
    }
  };

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
          onSubmit={(e) => handleFormSubmit(e)}
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
            value={state.firstName}
            onChange={(e) =>
              setState((prev) => ({ ...prev, firstName: e.target.value }))
            }
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
            value={state.lastName}
            onChange={(e) =>
              setState((prev) => ({ ...prev, lastName: e.target.value }))
            }
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
            value={state.email}
            onChange={(e) =>
              setState((prev) => ({ ...prev, email: e.target.value }))
            }
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
            value={state.password}
            onChange={(e) =>
              setState((prev) => ({ ...prev, password: e.target.value }))
            }
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
            value={state.confirmPassword}
            onChange={(e) =>
              setState((prev) => ({ ...prev, confirmPassword: e.target.value }))
            }
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
