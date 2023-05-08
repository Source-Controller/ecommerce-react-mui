import { styled } from "@mui/material/styles";
import { Box, IconButton, Button } from "@mui/material";

import { Colors } from "../theme";
import { slideInBottom, slideInRight } from "../../animation";

export const Product = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    position: "relative",
  },
}));

export const ProductImage = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  objectFit: "cover",
  width: "100%",
  borderRadius: "4px",
  [theme.breakpoints.down("md")]: {
    width: "80%",
    padding: "24px",
  },
}));

export const ProductActionButton = styled(IconButton)(() => ({
  background: Colors.white,
  margin: 4,
  "&.MuiIconButton-root": {
    "&:hover": {
      color: Colors.primary,
      background: Colors.white,
    },
  },
}));

export const ProductFavButton = styled(ProductActionButton, {
  shouldForwardProp: (prop) => prop !== "isFav",
})(({ isFav, theme }) => ({
  color: isFav ? Colors.primary : Colors.light,
  [theme.breakpoints.up("md")]: {
    position: "absolute",
    right: "5px",
    top: "5px",
    background: isFav ? Colors.secondary : Colors.white,
  },
}));

export const ProductAddToCartButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "show",
})(({ show, theme }) => ({
  width: "120px",
  fontSize: "12px",
  background: Colors.secondary,
  opacity: 0.9,
  [theme.breakpoints.up("md")]: {
    position: "absolute",
    bottom: "15px",
    width: "300px",
    padding: "10px 5px",
  },
  animation:
    show &&
    `${slideInBottom} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
}));

export const ProductMetaWrapper = styled(Box)(() => ({
  padding: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const ProductActionsWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "show",
})(({ show, theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: show ? "visible" : "none",
    position: "absolute",
    right: "5px",
    top: "55px",
    animation:
      show &&
      `${slideInRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
  },
}));
