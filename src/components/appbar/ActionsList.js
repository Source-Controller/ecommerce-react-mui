import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";

import {
  ActionIconsContainerMobile,
  ActionIconsContainerDesktop,
} from "../../styles/appbar";
import { Colors } from "../../styles/theme";
import { useUIContext } from "../../context/ui";
import useAuthStore from "../../store/authStore";
import UserMenu from "../accountMenu";

const LOGIN_ROUTE = "/login";

const ActionsList = ({ matches }) => {
  const authUser = useAuthStore((state) => state.authUser);
  const navigate = useNavigate();

  const Component = matches
    ? ActionIconsContainerMobile
    : ActionIconsContainerDesktop;

  const { cart, setShowCart } = useUIContext();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleLoginClick = () => {
    navigate(LOGIN_ROUTE);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Component>
      <Tooltip title="Cart">
        <IconButton
          sx={{
            color: matches ? Colors.secondary : Colors.primary,
          }}
        >
          <Badge badgeContent={cart && cart.length} color="secondary">
            <ShoppingCartIcon onClick={() => setShowCart(true)} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title="Wishlist">
        <IconButton
          sx={{
            color: matches ? Colors.secondary : Colors.primary,
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </Tooltip>

      {authUser ? (
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{
              color: matches ? Colors.secondary : Colors.primary,
            }}
            aria-controls={Boolean(anchorElUser) ? "account-menu" : undefined}
            aria-expanded={Boolean(anchorElUser) ? "true" : undefined}
            aria-haspopup="true"
          >
            <PersonIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Sign In">
          <IconButton
            onClick={handleLoginClick}
            sx={{
              color: matches ? Colors.secondary : Colors.primary,
            }}
            aria-controls={Boolean(anchorElUser) ? "account-menu" : undefined}
            aria-expanded={Boolean(anchorElUser) ? "true" : undefined}
            aria-haspopup="true"
          >
            <PersonIcon />
          </IconButton>
        </Tooltip>
      )}
      <UserMenu anchorEl={anchorElUser} onClose={handleCloseUserMenu} />
    </Component>
  );
};

export default ActionsList;
