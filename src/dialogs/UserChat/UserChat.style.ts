import { styled } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";

export const ToolbarWrapper = styled(Stack)(() => ({
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const ChatBoxWrapper = styled(Stack)(() => ({
  flexDirection: "column",
  justifyContent: "space-between",
  height: "90%",
}));

export const ChatBoxTop = styled(Box)(() => ({
  height: "100%",
  overflowY: "auto",
  padding: "10px",
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

export const ChatBoxBottom = styled(Stack)(() => ({
  flexDirection: "row",
  padding: "10px",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  width: "100%",
}));

export const MessageWrapper = styled(Stack)(() => ({
  flexDirection: "column",
  marginTop: "15px",
}));

export const MessageText = styled(Typography)(() => ({
  padding: "10px",
  borderRadius: "5px",
  maxWidth: "300px",
  color: "white",
}));

export const ConversationWrapper = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "end",
  justifyContent: "center",
  height: "95%",
  padding: "20px",
}));
