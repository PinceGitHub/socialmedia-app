import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const Container = styled(Stack)(() => ({
  width: "100vw",
  height: "100vh",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "whitesmoke",
}));

export const Wrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "16px",
  height: "auto",
  [theme.breakpoints.up("xs")]: {
    width: "calc(100vw - 5%)",
  },
  [theme.breakpoints.up("sm")]: {
    width: "75%",
  },
  [theme.breakpoints.up("md")]: {
    width: "55%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "35%",
  },
}));
