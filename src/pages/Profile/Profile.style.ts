import { styled } from "@mui/material/styles";
import { Avatar, Stack } from "@mui/material";

export const Container = styled(Stack)(() => ({
  width: "100%",
  flexDirection: "column",
}));

export const Top = styled(Stack)(() => ({
  width: "100%",
  flexDirection: "column",
  height: "300px",
  position: "relative",
}));

export const CoverPicture = styled("img")(() => ({
  width: "100%",
  height: "250px",
  objectFit: "cover",
}));

export const ProfilePicture = styled(Avatar)(() => ({
  width: "120px",
  height: "120px",
  position: "absolute",
  left: "0",
  right: "0",
  margin: "auto",
  top: "180px",
  border: "3px solid white",
}));

export const ProfileInfo = styled(Stack)(() => ({
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export const Bottom = styled(Stack)(() => ({
  width: "100%",
  flexDirection: "row",
  overflow: "auto",
}));
