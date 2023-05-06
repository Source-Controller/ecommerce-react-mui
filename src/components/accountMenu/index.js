import { useNavigate } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";

import useAuthStore from "../../store/authStore";

const PROFILE_ROUTE = "/profile";

const UserMenu = ({ anchorEl, onClose }) => {
  const store = useAuthStore();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    store.signOut();
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate(PROFILE_ROUTE);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      id="account-menu"
      onClose={onClose}
      onClick={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      keepMounted
    >
      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
      <MenuItem onClick={handleLogoutClick}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
