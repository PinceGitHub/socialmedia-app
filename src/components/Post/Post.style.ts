import { styled } from "@mui/material/styles";
import { Stack, Avatar } from "@mui/material";

export const Container = styled(Stack)(() => ({
  width: "100%",
  borderRadius: "5px",
  WebkitBoxShadow: "0px 0px 17px -8px rgba(0, 0, 0, 0.68)",
  boxShadow: "0px 0px 17px -8px rgba(0, 0, 0, 0.68)",
  marginBottom: "32px",
}));

export const Wrapper = styled(Stack)(() => ({
  padding: "10px",
}));

export const Top = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const TopLeft = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const Profile = styled(Avatar)(({ theme }) => ({
  width: "1em",
  height: "1em",
  marginRight: "8px",
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

export const TopRight = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const Center = styled(Stack)(() => ({
  margin: "16px 0",
}));

export const PostImage = styled("img")(() => ({
  marginTop: "16px",
  width: "100%",
  maxHeight: "500px",
  objectFit: "contain",
}));

export const Bottom = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
}));
