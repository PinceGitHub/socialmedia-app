import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const Container = styled(Stack)(({ theme }) => ({
  width: "100%",
  flexDirection: "row",
  overflow: "auto",
  [theme.breakpoints.up("xs")]: {
    paddingTop: "10px",
  },
  [theme.breakpoints.up("sm")]: {
    paddingTop: "15px",
  },
  [theme.breakpoints.up("md")]: {
    paddingTop: "25px",
  },
}));
