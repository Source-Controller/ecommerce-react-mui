import { Box, Typography } from "@mui/material";

import Banner from "../components/banner";
import Promotions from "../components/promotions";
import Products from "../components/products";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Promotions />
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          p: 4,
        }}
      >
        <Typography variant="h4">Our products</Typography>
      </Box>
      <Products />
    </>
  );
};

export default HomePage;
