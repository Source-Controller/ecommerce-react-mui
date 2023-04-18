import { useEffect } from "react";

import { ThemeProvider } from "@mui/material/styles";
import { Container, Button } from "@mui/material";

import theme from "./styles/theme";
import Appbar from "./components/appbar";

function App() {
  useEffect(() => {
    document.title = "React Material UI - Home";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ background: "#fff" }}>
        <Appbar />
        {/*
        Banner
        Promotions
        Title
        Products
        Footer
        Search box
        Drawer
        */}
        <Button variant="contained">Test</Button>
      </Container>
    </ThemeProvider>
  );
}

export default App;
