import { NavLink } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import ListItemButton from "@mui/material/ListItemButton";
import SearchIcon from "@mui/icons-material/Search";

import {
  AppbarHeader,
  MyList,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../styles/appbar";
import { useUIContext } from "../../context/ui";
import ActionsList from "./ActionsList";
import { Colors } from "../../styles/theme";

const navbarItems = ["Home", "Categories"];
const navbarRoutes = ["/", "categories"];

const ResponsiveAppBar = ({ matches }) => {
  const { setShowSearchBox } = useUIContext();

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar>
          <AppbarHeader>Store</AppbarHeader>
          <MyList type="row">
            {navbarItems.map((item, index) => (
              <ListItemButton
                component={NavLink}
                to={`${navbarRoutes[index]}`}
                key={item}
                disableGutters
                style={({ isActive }) => {
                  return {
                    color: isActive ? Colors.primary : Colors.dim_gray,
                    fontWeight: isActive ? "bold" : "",
                    textDecoration: "none",
                  };
                }}
                sx={{ justifyContent: "center" }}
              >
                {item}
              </ListItemButton>
            ))}
          </MyList>

          <Search onClick={() => setShowSearchBox(true)}>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: Colors.dim_gray }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <ActionsList matches={matches} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
