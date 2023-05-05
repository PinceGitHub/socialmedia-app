import { styled } from "@mui/material/styles";
import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import { Cancel } from "@mui/icons-material";

export const Container = styled(Stack)(() => ({
  width: "100%",
  flexDirection: "column",
  margin: "normal",
}));

export const Center = styled(Box)(() => ({
  position: "relative",
  marginTop: "10px",
}));

export const ImgCancel = styled(Cancel)(() => ({
  position: "absolute",
  top: "-15px",
  right: "-10px",
  cursor: "pointer",
  opacity: "0.7",
  color: "red",
}));

export const ProfileSection = styled(Stack)(() => ({
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "24px",
}));

export const CoverSection = styled(Stack)(() => ({
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "24px",
}));

export const CoverPicture = styled("img")(({ theme }) => ({
  height: "250px",
  objectFit: "cover",
  marginBottom: "16px",
  [theme.breakpoints.up("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    width: "500px",
  },
}));

export const InfoSection = styled(Stack)(() => ({
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "24px",
}));

export const InfoText = styled(TextField)(({ theme }) => ({
  marginBottom: "16px",
  [theme.breakpoints.up("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    width: "320px",
  },
}));

export const InfoCombo = styled(Autocomplete)(({ theme }) => ({
  marginBottom: "16px",
  [theme.breakpoints.up("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    width: "320px",
  },
}));

export const UploadOption = styled("label")(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  fontWeight: "500",
  padding: "5px",
  border: "1px solid #1976d2",
  borderRadius: "5px",
}));
