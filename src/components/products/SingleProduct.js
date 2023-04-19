import { Stack } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FitScreenIcon from "@mui/icons-material/FitScreen";

import useDialogModal from "../../hooks/useDialogModal";
import ProductDetails from "../productDetails";
import {
  Product,
  ProductActionButton,
  ProductActionsWrapper,
  ProductAddToCartButton,
  ProductFavButton,
  ProductImage,
} from "../../styles/products";
import ProductMeta from "./ProductMeta";

const SingleProduct = ({ product, matches }) => {
  const [
    ProductDetailsDialog,
    openProductDetailsDialog,
    closeProductDetailsDialog,
  ] = useDialogModal(ProductDetails);

  return (
    <>
      <Product>
        <ProductImage src={product.image} />
        <ProductMeta product={product} matches={matches} />
        <ProductActionsWrapper>
          <Stack direction="row">
            <ProductFavButton isFav={0}>
              <FavoriteIcon />
            </ProductFavButton>
            <ProductActionButton>
              <ShareIcon color="primary" />
            </ProductActionButton>
            <ProductActionButton onClick={openProductDetailsDialog}>
              <FitScreenIcon color="primary" />
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
      </Product>
      <ProductAddToCartButton variant="contained">
        Add to cart
      </ProductAddToCartButton>
      <ProductDetailsDialog product={product} />
    </>
  );
};

export default SingleProduct;
