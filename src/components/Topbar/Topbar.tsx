import { Wrapper } from "./Topbar.style";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { appUrls, serviceUrls } from "../../utils/app-utils";
import { Link, useNavigate } from "react-router-dom";
import useDownloadImg from "../../hooks/useDownloadImg";
import usePics from "../../hooks/usePics";
import useLoader from "../../hooks/useLoader";
import useSnackbar from "../../hooks/useSnackbar";
import { axiosPrivate } from "../../utils/axios-utils";

const settings = ["Profile", "Logout"];

const Topbar = () => {
  const { auth, setAuth, setFetchTokenResp, socket } = useAuth();
  const navigate = useNavigate();
  const { pics } = usePics();
  const getPic = useDownloadImg();
  const showLoader = useLoader();
  const snackbar = useSnackbar();

  const [profilePic, setProfilePic] = useState("");
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (auth) {
      const key = `${auth.userId}_profile_${auth.profilePicture}`;

      if (pics.has(key)) {
        setProfilePic(pics.get(key) as string);
      } else {
        auth.profilePicture !== "" &&
          getPic(auth.userId, "profile", auth.profilePicture);
      }
    }

    //eslint-disable-next-line
  }, [auth, pics]);

  const handleSelectMenuItem = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const selectedOption = e.currentTarget.innerText;

    if (selectedOption.toLowerCase() === "profile") {
      setAnchorElUser(null);
      auth && navigate(appUrls.profile.replace(":id", auth.userId));
    } else {
      try {
        showLoader(true);

        await axiosPrivate({
          url: serviceUrls.auth.logout.path,
          method: serviceUrls.auth.logout.method,
        });

        setAuth(null);
        setFetchTokenResp({ fetched: true, isSuccessful: false });

        if (socket?.connected) {
          socket.disconnect();
        }
        navigate(appUrls.signIn);
      } catch (error: any) {
        snackbar({
          show: true,
          messageType: "error",
          message: error.response?.data?.message || error.message,
        });
      } finally {
        showLoader(false);
      }
    }
  };
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Wrapper>
            <Link to={appUrls.home} style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  color: "white",
                  textDecoration: "none",
                }}
              >
                socialmedia
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open options">
                <IconButton
                  onClick={(e) => setAnchorElUser(e.currentTarget)}
                  sx={{ p: 0 }}
                >
                  <Avatar src={profilePic} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={(e) => handleSelectMenuItem(e)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Wrapper>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Topbar;
