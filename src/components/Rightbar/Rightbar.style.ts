import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const Container = styled(Stack)(() => ({
  flex: 3,
}));

export const Wrapper = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    padding: "10px",
  },
  [theme.breakpoints.up("sm")]: {
    padding: "15px",
  },
  [theme.breakpoints.up("md")]: {
    padding: "25px",
  },
}));
