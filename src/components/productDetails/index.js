import {
  Dialog,
  Slide,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Colors } from "../../styles/theme";
import { Product, ProductImage } from "../../styles/products";
import IncDec from "../ui";

const SlideTransition = (props) => {
  return <Slide direction="down" {...props}></Slide>;
};

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

  return (
    <Dialog
      variant="permanent"
      open={open}
      TransitionComponent={SlideTransition}
      fullScreen
    >
      <DialogTitle sx={{ background: Colors.secondary }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Product title
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <ProductDetailsWrapper flexDirection={matches ? "column" : "row"}>
          <Product sx={{ mr: 4 }}>
            <ProductImage src={product.image} />
          </Product>
          <ProductDetailsInfoWrapper>
            <Typography variant="subtitle1">SKU 123</Typography>
            <Typography variant="subtitle1">
              Availability: 5 in stock
            </Typography>
            <Typography variant="h4" sx={{ lineHeight: 2 }}>
              {product.name}
            </Typography>
            <Typography variant="body">{product.description}</Typography>
            <Box
              sx={{ mt: 4 }}
              display="flex"
              alignItems="center"
              justifyContent="spaceBetween"
            >
              <IncDec />
              <Button variant="contained">Add to cart</Button>
            </Box>
            <Box
              sx={{ mt: 4, color: Colors.light }}
              display="flex"
              alignItems="center"
            >
              <FavoriteIcon sx={{ mr: 2 }} />
              Add to wishlist
            </Box>
            <Box sx={{ mt: 4, color: Colors.light }}>
              <FacebookIcon />
              <TwitterIcon sx={{ pl: theme.spacing(4) }} />
              <InstagramIcon sx={{ pl: theme.spacing(4) }} />
            </Box>
          </ProductDetailsInfoWrapper>
        </ProductDetailsWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
