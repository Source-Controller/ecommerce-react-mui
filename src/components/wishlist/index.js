import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";

import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Colors } from "../../styles/theme";
import { useUIContext } from "../../context/ui";

const Wishlist = () => {
  const {
    wishlist,
    setWishlist,
    showWishlist,
    setShowWishlist,
    cart,
    setCart,
  } = useUIContext();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const removeItem = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const moveToCart = (product) => {
    setCart([...cart, product]);
    removeItem(product.id);
  };

  const wishlistEmptyContent = (
    <Typography variant={matches ? "h6" : "h5"} color={Colors.black}>
      Click <FavoriteIcon /> to add products to your wishlist
    </Typography>
  );

  const wishlistFilledContent = wishlist.map((item) => (
    <>
      <ListItem
        key={item.id}
        alignItems="flex-start"
        position="relative"
        sx={{ padding: "15px 0 30px 0" }}
      >
        <ListItemAvatar>
          <Avatar
            alt={item.title}
            src={item.images[0]}
            sx={{ width: 90, height: 90, mr: 2 }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="h4" fontSize="20px">
              {item.title}
            </Typography>
          }
          secondary={
            <>
              <Typography variant="body1">{item.description}</Typography>
              <Typography variant="h6">{`$${item.price}`}</Typography>
            </>
          }
        />
        <Stack direction="row">
          <Toolbar
            variant="dense"
            sx={{
              "&.MuiToolbar-root": {
                padding: 0,
              },
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          >
            <Tooltip title="Move to cart">
              <IconButton onClick={() => moveToCart(item)}>
                <ShoppingCartIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remove from wishlist">
              <IconButton onClick={() => removeItem(item.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Stack>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  ));

  return (
    <Drawer
      open={showWishlist}
      onClose={() => setShowWishlist(false)}
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
        {wishlist.length ? (
          <>
            <Typography variant="h3" color={Colors.black}>
              Your wishlist
            </Typography>
            <Button onClick={() => setWishlist([])} sx={{ mt: 4 }}>
              Clear wishlist
            </Button>
            <Paper elevation={0} sx={{ mt: 2, width: "95%", p: 4 }}>
              <List>{wishlistFilledContent}</List>
            </Paper>
          </>
        ) : (
          wishlistEmptyContent
        )}
      </Box>
      <Button onClick={() => setShowWishlist(false)}>Close</Button>
    </Drawer>
  );
};

export default Wishlist;
