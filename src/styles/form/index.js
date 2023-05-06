import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";

import { Colors } from "../theme";

export const FormContainer = styled(Paper)(() => ({
  height: "450px",
  width: "300px",
  padding: "20px",
  margin: "50px auto",
  position: "relative",
  elevation: 5,
}));

export const FormHeader = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "35px",
}));

export const NotificationBlock = styled(Box, {
  shouldForwardProp: (prop) => prop !== "show",
})(({ show }) => ({
  position: show ? "relative" : "absolute",
  left: show ? 0 : -9999,
  padding: "5px 10px",
  width: "90%",
  background: Colors.light_gray,
  borderRadius: "4px",
}));

export const NotificationtText = styled(Typography)(() => ({
  fontSize: "10px",
  paddingLeft: "15px",
  lineHeight: 1,
  color: Colors.black,
}));

export const NotificationIcon = styled(InfoIcon)(() => ({
  color: Colors.shaft,
  fontSize: "16px",
  position: "absolute",
  top: 3,
  left: 3,
}));
