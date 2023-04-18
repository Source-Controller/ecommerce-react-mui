import { IconButton } from "@mui/material";

import { AppbarContainer, AppbarHeader } from "../../styles/appbar";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ActionsList from "./ActionsList";

const AppbarMobile = ({ matches }) => {
  return (
    <AppbarContainer>
      <IconButton>
        <MenuIcon />
      </IconButton>
      <AppbarHeader textAlign={"center"} variant="h4">
        My bags
      </AppbarHeader>
      <IconButton>
        <SearchIcon />
      </IconButton>
      <ActionsList matches={matches} />
    </AppbarContainer>
  );
};

export default AppbarMobile;
