import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";

import { Colors } from "../theme";

export const BannerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  height: "100vh",
  padding: 0,
  marginTop: "10px",
  background: Colors.light_gray,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const BannerContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: 420,
  padding: "30px 80px",
}));

export const BannerTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  lineHeight: 1.5,
  fontSize: "64px",
  marginBottom: "20px",
  [theme.breakpoints.down("md")]: {
    fontSize: "54px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "44px",
  },
}));

export const BannerDescription = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  lineHeight: 1.25,
  letterSpacing: 1.25,
  marginBottom: "3em",
  [theme.breakpoints.down("md")]: {
    lineHeight: 1.15,
    letterSpacing: 1.15,
    marginBottom: "1.5em",
  },
}));

export const BannerImage = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  width: "50%",
  objectFit: "cover",
  [theme.breakpoints.down("sm")]: {
    height: "300px",
    width: "100%",
  },
}));

export const BannerShopButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "color",
  name: "ShopButton",
  slot: "Root",
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === "primary" && styles.primary,
    props.color === "secondaary" && styles.secondary,
  ],
})(({ theme }) => ({
  padding: "20px 100px",
  fontWeight: "bold",
  fontSize: "16px",
  [theme.breakpoints.down("md")]: {
    padding: "10px 70px",
    fontSize: "14px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 50px",
    fontSize: "14px",
  },
}));
