import { Typography } from "@mui/material";
import { ProductMetaWrapper } from "../../styles/products";

const ProductMeta = ({ product, matches }) => {
  return (
    <ProductMetaWrapper>
      <Typography variant="subtitle1" lineHeight={2}>
        {product.title}
      </Typography>
      <Typography variant={matches ? "h5" : "h6"}>${product.price}</Typography>
    </ProductMetaWrapper>
  );
};

export default ProductMeta;
