import { useState } from "react";

import { Stack } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FitScreenIcon from "@mui/icons-material/FitScreen";

import useDialogModal from "../../hooks/useDialogModal";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";
import {
  Product,
  ProductActionButton,
  ProductActionsWrapper,
  ProductAddToCartButton,
  ProductFavButton,
  ProductImage,
} from "../../styles/products";
import ProductDetails from "../productDetails";
import ProductMeta from "./ProductMeta";

const SingleProductDesktop = ({ product, matches }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const onImageError = (e) => {
    e.target.src = "/images/product-placeholder.jpg";
  };

  const [ProductDetailsDialog, openProductDetailsDialog] =
    useDialogModal(ProductDetails);

  const { addToCart, addToCartText } = useCart(product);
  const { handleLikeClick } = useWishlist(product);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const handleProductLike = () => {
    setIsFav((prev) => !prev);
    handleLikeClick();
  };

  return (
    <>
      <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ProductImage src={product.images[0]} onError={onImageError} />
        <ProductFavButton isFav={isFav} onClick={handleProductLike}>
          <FavoriteIcon />
        </ProductFavButton>
        {showOptions && (
          <ProductAddToCartButton
            onClick={addToCart}
            show={showOptions}
            variant="contained"
          >
            {addToCartText}
          </ProductAddToCartButton>
        )}
        <ProductActionsWrapper show={showOptions}>
          <Stack direction="column">
            <ProductActionButton>
              <ShareIcon />
            </ProductActionButton>
            <ProductActionButton onClick={openProductDetailsDialog}>
              <FitScreenIcon />
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
      </Product>
      <ProductMeta product={product} matches={matches} />
      <ProductDetailsDialog product={product} />
    </>
  );
};

export default SingleProductDesktop;
