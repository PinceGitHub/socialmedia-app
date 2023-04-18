import { styled } from "@mui/material/styles";
import { Autocomplete, Stack, TextField } from "@mui/material";

export const Container = styled(Stack)(() => ({
  width: "100%",
  flexDirection: "column",
  margin: "normal",
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
