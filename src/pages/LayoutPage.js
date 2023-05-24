import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";

import { UIProvider } from "../context/ui";
import theme from "../styles/theme";

import Appbar from "../components/appbar";
import SearchBox from "../components/search";
import Footer from "../components/footer";
import AppDrawer from "../components/drawer";
import Cart from "../components/cart";
import Wishlist from "../components/wishlist";

const LayoutPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ background: "#fff" }}>
        <UIProvider>
          <Appbar />
          <AppDrawer />
          <SearchBox />
          <Cart />
          <Wishlist />
          <Outlet />
          <Footer />
        </UIProvider>
      </Container>
    </ThemeProvider>
  );
};

export default LayoutPage;
