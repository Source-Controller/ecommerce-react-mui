import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import AppbarMobile from "./AppbarMobile";
import AppbarDesktop from "./AppbarDesktop";

const Appbar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {matches ? (
        <AppbarMobile matches={matches} />
      ) : (
        <AppbarDesktop matches={matches} />
      )}
    </>
  );
};

export default Appbar;
