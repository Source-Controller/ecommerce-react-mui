import { useState } from "react";
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
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

const SingleProduct = ({ product, matches }) => {
  const [ProductDetailsDialog, openProductDetailsDialog] =
    useDialogModal(ProductDetails);

  const { addToCart, addToCartText } = useCart(product);
  const { handleLikeClick } = useWishlist(product);
  const [isFav, setIsFav] = useState(false);

  const handleProductLike = () => {
    setIsFav((prev) => !prev);
    handleLikeClick();
  };

  const onImageError = (e) => {
    e.target.src = "/images/product-placeholder.jpg";
  };

  return (
    <>
      <Product>
        <ProductImage src={product.images[0]} onError={onImageError} />
        <ProductMeta product={product} matches={matches} />
        <ProductActionsWrapper>
          <Stack direction="row">
            <ProductFavButton isFav={isFav} onClick={handleProductLike}>
              <FavoriteIcon />
            </ProductFavButton>
            <ProductActionButton>
              <ShareIcon />
            </ProductActionButton>
            <ProductActionButton onClick={openProductDetailsDialog}>
              <FitScreenIcon />
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
      </Product>
      <ProductAddToCartButton onClick={addToCart} variant="contained">
        {addToCartText}
      </ProductAddToCartButton>
      <ProductDetailsDialog product={product} />
    </>
  );
};

export default SingleProduct;
