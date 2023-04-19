// import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
// import useMediaQuery from "@mui/material/useMediaQuery";

import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerShopButton,
  BannerTitle,
} from "../../styles/banner";

const Banner = () => {
  // const theme = useTheme();
  // const matches = useMedsiaQuery(theme.breakpoints.down("md"));

  return (
    <BannerContainer>
      <BannerImage src="/images/banner/banner.png" />
      <BannerContent>
        <Typography variant="h6">Huge collection</Typography>
        <BannerTitle variant="h2">New bags</BannerTitle>
        <BannerDescription variant="subtitle">lorem</BannerDescription>
        <BannerShopButton color="primary">Shop Now</BannerShopButton>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;
