import { styled } from "@mui/material/styles";
import { Stack, Avatar, Typography, Box } from "@mui/material";
import { PermMedia, Cancel } from "@mui/icons-material";

export const Container = styled(Stack)(() => ({
  width: "100%",
  borderRadius: "5px",
  WebkitBoxShadow: "0px 0px 17px -8px rgba(0, 0, 0, 0.68)",
  boxShadow: "0px 0px 17px -8px rgba(0, 0, 0, 0.68)",
}));

export const Wrapper = styled(Stack)(() => ({
  padding: "10px",
}));

export const Profile = styled(Avatar)(({ theme }) => ({
  width: "1em",
  height: "1em",
  [theme.breakpoints.up("xs")]: {
    display: "none",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

export const Center = styled(Box)(() => ({
  position: "relative",
  marginTop: "10px",
}));

export const ShareImg = styled("img")(() => ({
  width: "100%",
  maxHeight: "500px",
  objectFit: "cover",
}));

export const ShareImgCancel = styled(Cancel)(() => ({
  position: "absolute",
  top: "-15px",
  right: "-10px",
  cursor: "pointer",
  opacity: "0.7",
  color: "red",
}));

export const Bottom = styled(Stack)(() => ({
  padding: "10px",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const ShareOption = styled("label")(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
}));

export const MediaIcon = styled(PermMedia)(() => ({
  fontSize: "16px",
  marginRight: "8px",
  color: "tomato",
}));

export const ShareText = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "500",
  [theme.breakpoints.up("xs")]: {
    display: "none",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));
