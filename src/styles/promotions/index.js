import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { Colors } from "../theme";

export const PromotionsContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px 0",
  overflow: "hidden",
  background: Colors.secondary,
}));

export const MessageText = styled(Typography)(({ theme }) => ({
  fontFamily: "\"Montez\", \"Cursive\"",
  color: Colors.white,
  fontSize: "1.5rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
}));
