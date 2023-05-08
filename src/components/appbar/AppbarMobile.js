import { IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ActionsList from "./ActionsList";

import { AppbarContainer, AppbarHeader } from "../../styles/appbar";
import { useUIContext } from "../../context/ui";

const AppbarMobile = ({ matches }) => {
  const { setDrawerOpen, setShowSearchBox } = useUIContext();

  return (
    <AppbarContainer>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <AppbarHeader textAlign="center" variant="h4">
        Store
      </AppbarHeader>
      <IconButton onClick={() => setShowSearchBox(true)}>
        <SearchIcon />
      </IconButton>
      <ActionsList matches={matches} />
    </AppbarContainer>
  );
};

export default AppbarMobile;
