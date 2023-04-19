import { Container, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import SingleProduct from "./SingleProduct";
import SingleProductDesktop from "./SingleProductDesktop";
import { products } from "../../data";

const Products = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const renderProducts = products.map((product) => {
    return (
      <Grid
        item
        xs={2}
        sm={4}
        md={4}
        key={product.id}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {matches ? (
          <SingleProduct product={product} matches={matches} />
        ) : (
          <SingleProductDesktop product={product} matches={matches} />
        )}
      </Grid>
    );
  });
  return (
    <Container>
      <Grid
        container
        spacing={{ xs: 2, sm: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="center"
        sx={{ margin: "20px 4px 10px 4px" }}
      >
        {renderProducts}
      </Grid>
    </Container>
  );
};

export default Products;
