import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import ListItemButton from "@mui/material/ListItemButton";

import { NavLink } from "react-router-dom";
import { AppbarHeader, MyList } from "../../styles/appbar";
import { useUIContext } from "../../context/ui";
import ActionsList from "./ActionsList";
import SearchIcon from "@mui/icons-material/Search";
import { Colors } from "../../styles/theme";

const navbarItems = ["Home", "Categories", "Products", "Contact Us"];
const navbarRoutes = ["/", "categories", "products", "contact"];

function ResponsiveAppBar({ matches }) {
  const { setShowSearchBox } = useUIContext();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar>
          <AppbarHeader>Store</AppbarHeader>
          {/* <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {navbarItems.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu> */}
          <MyList type="row">
            {navbarItems.map((item, index) => (
              <ListItemButton
                key={item}
                disableGutters
                sx={{ justifyContent: "center" }}
              >
                <NavLink
                  to={`${navbarRoutes[index]}`}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? Colors.primary : Colors.dim_gray,
                      fontWeight: isActive ? "bold" : "",
                      textDecoration: "none",
                    };
                  }}
                >
                  {item}
                </NavLink>
              </ListItemButton>
            ))}
          </MyList>

          <Search
          //  onClick={() => setShowSearchBox(true)}
          >
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
}
export default ResponsiveAppBar;
