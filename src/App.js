import { useEffect } from "react";

import { ThemeProvider } from "@mui/material/styles";
import { Container, Typography, Box } from "@mui/material";

import { UIProvider } from "./context/ui";
import theme from "./styles/theme";
import Appbar from "./components/appbar";
import Banner from "./components/banner";
import Promotions from "./components/promotions";
import Products from "./components/products";
import Footer from "./components/footer";
import AppDrawer from "./components/drawer";
import SearchBox from "./components/search";

function App() {
  useEffect(() => {
    document.title = "React Material UI - Home";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ background: "#fff" }}>
        <UIProvider>
          <Appbar />
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
          <Footer />
          <AppDrawer />
          <SearchBox />
        </UIProvider>
      </Container>
    </ThemeProvider>
  );
}

export default App;
