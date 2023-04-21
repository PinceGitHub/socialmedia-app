import { useState } from "react";
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
import { appUrls } from "../../utils/app-utils";

const settings = ["Profile", "Logout"];

const Topbar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Wrapper>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href={appUrls.home}
              sx={{
                mr: 2,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              socialmedia
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open options">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="" />
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
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
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
