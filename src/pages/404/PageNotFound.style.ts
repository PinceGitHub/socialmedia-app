import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

export const Container = styled(Stack)(() => ({
  width: "100vw",
  height: "100vh",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));
