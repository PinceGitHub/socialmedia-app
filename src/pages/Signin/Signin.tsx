import { Container, Wrapper } from "./Signin.style";
import {
  Avatar,
  Stack,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Lock } from "@mui/icons-material";

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { appUrls, serviceUrls } from "../../utils/app-utils";
import { axiosPrivate } from "../../utils/axios-utils";
import useAuth from "../../hooks/useAuth";
import useLoader from "../../hooks/useLoader";
import useSnackbar from "../../hooks/useSnackbar";

type SigninType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || appUrls.home;

  const { setAuth, setPersist } = useAuth();
  const showLoader = useLoader();
  const snackbar = useSnackbar();

  const [{ email, password, rememberMe }, setSignin] = useState<SigninType>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSigninFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      showLoader(true);

      const response = await axiosPrivate({
        url: serviceUrls.auth.login.path,
        method: serviceUrls.auth.login.method,
        data: { email, password },
      });

      if (response.data.messageType === "S") {
        setAuth({
          userId: response.data.user.id,
          email,
          accessToken: response.data.user.accessToken,
        });
        setPersist(rememberMe);
        navigate(from, { replace: true });
      } else {
        snackbar({
          show: true,
          messageType: "error",
          message: response.data.message,
        });
      }
    } catch (error: any) {
      snackbar({
        show: true,
        messageType: "error",
        message: error.message,
      });
    } finally {
      showLoader(false);
    }
  };

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
          onSubmit={(e) => handleSigninFormSubmit(e)}
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
            value={email}
            onChange={(e) =>
              setSignin((prev) => ({ ...prev, email: e.target.value }))
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
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) =>
              setSignin((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <FormControlLabel
            sx={{ mb: 2 }}
            id="rememberMe"
            name="rememberMe"
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) =>
                  setSignin((prev) => ({
                    ...prev,
                    rememberMe: e.target.checked,
                  }))
                }
              />
            }
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2, height: "50px" }}
          >
            Sign In
          </Button>
          <Link
            style={{
              textDecoration: "none",
              color: "#1976d2",
              marginBottom: "16px",
              textAlign: "center",
            }}
            to={`/${appUrls.signUp}`}
          >
            SIGN UP
          </Link>
        </Stack>
      </Wrapper>
    </Container>
  );
};

export default Signin;
