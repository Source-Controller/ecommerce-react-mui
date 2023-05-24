import { forwardRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";

import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Colors } from "../../styles/theme";
import { Product, ProductImage } from "../../styles/products";
import IncDec from "../ui";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

const SlideTransition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ProductDetailsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4),
}));

const ProductDetailsInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  lineHeight: 1.5,
}));

const ProductDetails = ({ product, open, onClose }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const { addToCart, addToCartText } = useCart(product);
  const { handleLikeClick, wishlistActionText } = useWishlist(product);

  const onImageError = (e) => {
    e.target.src = "/images/product-placeholder.jpg";
  };

  return (
    <Dialog
      variant="permanent"
      fullScreen
      open={open}
      TransitionComponent={SlideTransition}
    >
      <DialogTitle sx={{ background: Colors.secondary, position: "relative" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton edge="end" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {product.title}
          </Typography>
        </Toolbar>
      </DialogTitle>
      <DialogContent>
        <ProductDetailsWrapper flexDirection={matches ? "column" : "row"}>
          <Product sx={{ mr: 4 }}>
            <ProductImage src={product.images[0]} onError={onImageError} />
          </Product>
          <ProductDetailsInfoWrapper>
            <Typography variant="h4" sx={{ lineHeight: 2 }}>
              {product.title}
            </Typography>

            <Typography variant="body">{product.description}</Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mt: 4 }}
            >
              <IncDec />
              <Button variant="contained" onClick={() => addToCart()}>
                {addToCartText}
              </Button>
            </Stack>
            <Button
              sx={{ mt: 4, color: Colors.light }}
              onClick={() => handleLikeClick()}
            >
              <FavoriteIcon sx={{ mr: 2 }} />
              {wishlistActionText}
            </Button>
            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{
                mt: 4,
                color: Colors.light,
              }}
            >
              <FacebookIcon sx={{ "&:hover": { color: Colors.primary } }} />
              <TwitterIcon sx={{ "&:hover": { color: Colors.primary } }} />
              <InstagramIcon sx={{ "&:hover": { color: Colors.primary } }} />
            </Stack>
            <Box sx={{ mt: 4 }}>
              <Typography variant="body">
                See another products in this category:{" "}
                <span>{product.category?.name}</span>
              </Typography>
            </Box>
          </ProductDetailsInfoWrapper>
        </ProductDetailsWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
