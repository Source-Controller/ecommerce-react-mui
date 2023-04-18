import { useEffect } from "react";

import { Container, Button } from "@mui/material";

function App() {
  useEffect(() => {
    document.title = "React Material UI - Home";
  }, []);

  return (
    <Container maxWidth="xl" sx={{ background: "#fff" }}>
      {/*
        Appbar
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
  );
}

export default App;
