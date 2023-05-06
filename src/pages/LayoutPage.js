import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";

import { UIProvider } from "../context/ui";
import theme from "../styles/theme";

import Appbar from "../components/appbar";
import SearchBox from "../components/search";
import Footer from "../components/footer";
import Cart from "../components/cart";
import AppDrawer from "../components/drawer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const LayoutPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ background: "#fff" }}>
        <UIProvider>
          <QueryClientProvider client={queryClient}>
            <Appbar />
            <AppDrawer />
            <SearchBox />
            <Cart />
            <Outlet />
            <Footer />
          </QueryClientProvider>
        </UIProvider>
      </Container>
    </ThemeProvider>
  );
};

export default LayoutPage;
