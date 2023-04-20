import { useState } from "react";
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
import { appUrls, serviceUrls } from "../../utils/app-utils";
import { axiosPrivate } from "../../utils/axios-utils";
import useAuthContext from "../../hooks/useAuthContext";

type SigninType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Signin = () => {
  const { setAuth, setPersist } = useAuthContext();
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
      } else {
        alert(response.data.message);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
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
            sx={{ mb: 3 }}
            value={password}
            onChange={(e) =>
              setSignin((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <FormControlLabel
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
