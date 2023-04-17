import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const Container = styled(Stack)(() => ({
  flexDirection: "column",
  justifyContent: "center",
  marginBottom: "32px",
}));

export const InfoItem = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  [theme.breakpoints.up("xs")]: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: "8px",
  },
  [theme.breakpoints.up("sm")]: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: "8px",
  },
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "0",
  },
}));
