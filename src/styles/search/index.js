import { styled } from "@mui/material/styles";
import { Box, TextField } from "@mui/material";

import { Colors } from "../theme";

export const SearchBoxContainer = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: Colors.primary,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0.9,
  zIndex: 10000,
}));

export const SearchField = styled(TextField)(({ theme }) => ({
  ".MuiInputLabel-root": {
    color: Colors.secondary,
  },
  ".MuiInput-root": {
    fontSize: "1rem",
    color: Colors.secondary,
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  },
  ".MuiInput-root::before": {
    borderBottom: `1px solid ${Colors.secondary}`,
  },
  padding: "0 0 0 40px",
}));
