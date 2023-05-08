import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";

import {
  ActionIconsContainerMobile,
  ActionIconsContainerDesktop,
  StyledBadge,
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

  const { cart, setShowCart, wishlist, setShowWishlist } = useUIContext();
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

  const cartLabel = (count) => {
    if (count > 0) {
      return `${count} products in the cart`;
    }
    return "no products in the cart";
  };

  const wishlistLabel = (count) => {
    if (count > 0) {
      return `${count} products in the wishlist`;
    }
    return "no products in the wishlist";
  };

  return (
    <Component>
      <Tooltip title="Cart">
        <IconButton
          onClick={() => setShowCart(true)}
          aria-label={cartLabel(cart?.length)}
          sx={{
            color: matches ? Colors.secondary : Colors.primary,
          }}
        >
          <StyledBadge badgeContent={cart?.length}>
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </Tooltip>

      <Tooltip title="Wishlist">
        <IconButton
          onClick={() => setShowWishlist(true)}
          aria-label={wishlistLabel(wishlist?.length)}
          sx={{
            color: matches ? Colors.secondary : Colors.primary,
          }}
        >
          <StyledBadge badgeContent={wishlist && wishlist.length}>
            <FavoriteIcon />
          </StyledBadge>
        </IconButton>
      </Tooltip>

      {authUser ? (
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{
              color: matches ? Colors.secondary : Colors.primary,
            }}
            aria-controls={anchorElUser ? "account-menu" : undefined}
            aria-expanded={anchorElUser ? "true" : undefined}
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
            aria-controls={anchorElUser ? "account-menu" : undefined}
            aria-expanded={anchorElUser ? "true" : undefined}
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
