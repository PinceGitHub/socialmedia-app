import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const FormText = styled(TextField)(({ theme }) => ({
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
