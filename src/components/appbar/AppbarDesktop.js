import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import ActionsList from "./ActionsList";
import { AppbarContainer, AppbarHeader, MyList } from "../../styles/appbar";

const AppbarDesktop = ({ matches }) => {
  return (
    <AppbarContainer>
      <AppbarHeader>My Bags</AppbarHeader>
      <MyList type="row">
        <ListItemText primary="Home" />
        <ListItemText primary="Categories" />
        <ListItemText primary="Products" />
        <ListItemText primary="Contact Us" />
        <ListItemButton>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
        </ListItemButton>
      </MyList>
      <ActionsList matches={matches} />
    </AppbarContainer>
  );
};

export default AppbarDesktop;
