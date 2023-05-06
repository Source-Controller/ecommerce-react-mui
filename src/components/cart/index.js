import { useTheme } from "@mui/material/styles";
import {
  Drawer,
  Box,
  useMediaQuery,
  Avatar,
  Typography,
  Divider,
  Paper,
  Button,
} from "@mui/material";

import { Colors } from "../../styles/theme";
import { useUIContext } from "../../context/ui";

const Cart = () => {
  const { cart, showCart, setShowCart } = useUIContext();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const cartEmptyContent = (
    <Typography variant={matches ? "h5" : "h3"} color={Colors.black}>
      Your cart is empty
    </Typography>
  );

  const cartNotEmptyContent = cart.map((item) => (
    <Box key={item.id}>
      <Box
        display="flex"
        alignItems="start"
        justifyContent="space-between"
        sx={{ pt: 2, pb: 2 }}
      >
        <Avatar src={item.images[0]} sx={{ width: 96, height: 96, mr: 2 }} />
        <Box display="flex" flexDirection="column">
          <Typography variant="h6">{item.title}</Typography>
          {!matches && (
            <Typography variant="subtitle2">{item.description}</Typography>
          )}
        </Box>
        <Typography variant="body1" justifyContent="end">
          ${item.price}
        </Typography>
      </Box>
      {matches && (
        <Typography variant="subtitle2">{item.description}</Typography>
      )}
      <Divider variant="inset" />
    </Box>
  ));

  return (
    <Drawer
      open={showCart}
      onClose={() => setShowCart(false)}
      anchor="right"
      PaperProps={{
        sx: {
          width: matches ? "100%" : 500,
          background: Colors.light_gray,
          borderRadius: 0,
        },
      }}
    >
      <Box
        sx={{ p: 4 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {cart.length ? (
          <>
            <Typography variant="h3" color={Colors.black}>
              Your cart
            </Typography>
            <Paper elevation={0} sx={{ mt: 2, width: "90%", p: 4 }}>
              {cartNotEmptyContent}
            </Paper>
            <Button sx={{ mt: 4 }} variant="contained">
              Proceed to payment
            </Button>
          </>
        ) : (
          cartEmptyContent
        )}
      </Box>
      <Button onClick={() => setShowCart(false)}>Close</Button>
    </Drawer>
  );
};

export default Cart;
