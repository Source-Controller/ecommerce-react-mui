import { useState } from "react";

import { Stack } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FitScreenIcon from "@mui/icons-material/FitScreen";

import useDialogModal from "../../hooks/useDialogModal";
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

  const [ProductDetailsDialog, openProductDetailsDialog] =
    useDialogModal(ProductDetails);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  return (
    <>
      <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ProductImage src={product.image} />
        <ProductFavButton isFav={0}>
          <FavoriteIcon />
        </ProductFavButton>
        {showOptions && (
          <ProductAddToCartButton show={showOptions} variant="contained">
            Add to cart
          </ProductAddToCartButton>
        )}
        <ProductActionsWrapper show={showOptions}>
          <Stack direction="column">
            <ProductActionButton>
              <ShareIcon color="primary" />
            </ProductActionButton>
            <ProductActionButton onClick={openProductDetailsDialog}>
              <FitScreenIcon color="primary" />
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
