import { useQuery } from "@tanstack/react-query";

import { useTheme } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import SingleProduct from "./SingleProduct";
import SingleProductDesktop from "./SingleProductDesktop";
import AppPagination from "../pagination";
import { usePagination } from "../../hooks/usePagination";
import ProductsService from "../../api/services/ProductsService";

const PRODUCTS_PER_PAGE = 9;
const PRODUCTS_TOTAL = 200;

const Products = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const { offset, handlePageChange } = usePagination(PRODUCTS_PER_PAGE);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery(
    ["products", offset],
    async () =>
      await ProductsService.getProductsPerPage({
        offset: offset,
        limit: PRODUCTS_PER_PAGE,
      }),
    {
      keepPreviousData: false,
    }
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
      {isLoading && <>Loading</>}
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
            pagesCount={Math.ceil(PRODUCTS_TOTAL / PRODUCTS_PER_PAGE)}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
};

export default Products;
