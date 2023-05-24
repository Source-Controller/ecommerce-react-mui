import { useQuery } from "@tanstack/react-query";

import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";

import { usePagination } from "../../hooks/usePagination";
import ProductsService from "../../api/services/ProductsService";
import AppPagination from "../pagination";
import SingleProductDesktop from "./SingleProductDesktop";
import SingleProduct from "./SingleProduct";
import CircularProgress from "@mui/material/CircularProgress";

const PRODUCTS_PER_PAGE = 9;
const PRODUCTS_TOTAL = 180;
const PRODUCTS_KEY = "products";

const Products = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const { offset, page, handlePageChange } = usePagination(PRODUCTS_PER_PAGE);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery(
    [PRODUCTS_KEY, offset],
    async () =>
      await ProductsService.getProductsPerPage({
        offset: offset,
        limit: PRODUCTS_PER_PAGE,
      })
  );

  const renderProducts = products?.map((product) => {
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
      {isLoading && (
        <Box
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      {error && <>{error.message}</>}
      {products && products.length > 0 && (
        <>
          <Grid
            container
            spacing={{ xs: 2, sm: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent="center"
            sx={{ margin: "20px 4px 10px 4px" }}
            width="100%"
          >
            {renderProducts}
          </Grid>
          <AppPagination
            page={page}
            handlePageChange={handlePageChange}
            pagesCount={Math.ceil(PRODUCTS_TOTAL / PRODUCTS_PER_PAGE)}
          />
        </>
      )}
    </Container>
  );
};

export default Products;
