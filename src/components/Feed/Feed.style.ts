import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const Container = styled(Stack)(() => ({
  flex: 9,
  overflowY: "auto",
  height: "calc(100vh - 90px)",
  paddingTop: "5px",
  "&::-webkit-scrollbar": {
    width: "2px",
    height: "2px",
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(0, 0, 0, 0.1)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));

export const Wrapper = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    padding: "0 10px 0px 10px",
  },
  [theme.breakpoints.up("sm")]: {
    padding: "0 15px 0px 15px",
  },
  [theme.breakpoints.up("md")]: {
    padding: "0 25px 0px 25px",
  },
}));
