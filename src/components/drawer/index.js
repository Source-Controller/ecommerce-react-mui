import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const MiddleDivider = styled((props) => (
  <Divider variant="middle" {...props} />
))``;

const AppDrawer = () => {
  return (
    <Drawer open={true}>
      <List>
        <ListItemButton>
          <ListItemText>Home</ListItemText>
        </ListItemButton>
        <MiddleDivider />
        <ListItemButton>
          <ListItemText>Categories</ListItemText>
        </ListItemButton>
        <MiddleDivider />
        <ListItemButton>
          <ListItemText>Products</ListItemText>
        </ListItemButton>
        <MiddleDivider />
        <ListItemButton>
          <ListItemText>About us</ListItemText>
        </ListItemButton>
        <MiddleDivider />
        <ListItemButton>
          <ListItemText>Contact us</ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default AppDrawer;
