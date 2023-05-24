import { NavLink } from "react-router-dom";
import { lighten } from "polished";
import { styled } from "@mui/material/styles";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import CloseIcon from "@mui/icons-material/Close";

import { useUIContext } from "../../context/ui";
import { DrawerCloseButton } from "../../styles/appbar";
import { Colors } from "../../styles/theme";

const MiddleDivider = styled((props) => (
  <Divider variant="middle" {...props} />
))``;

const navbarItems = ["Home", "Categories", "Contact Us"];
const navbarRoutes = ["/", "categories", "contact"];

const AppDrawer = () => {
  const { drawerOpen, setDrawerOpen } = useUIContext();

  return (
    <>
      {drawerOpen && (
        <DrawerCloseButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon
            sx={{
              fontSize: "2.5rem",
              color: lighten(0.09, Colors.secondary),
            }}
          />
        </DrawerCloseButton>
      )}
      <Drawer open={drawerOpen} position>
        <List>
          {navbarItems.map((item, index) => (
            <>
              <ListItemButton>
                <ListItemText>
                  <NavLink
                    to={`${navbarRoutes[index]}`}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? Colors : Colors.white,
                        textDecoration: "none",
                      };
                    }}
                  >
                    {item}
                  </NavLink>
                </ListItemText>
              </ListItemButton>
              <MiddleDivider />
            </>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default AppDrawer;
