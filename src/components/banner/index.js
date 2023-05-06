import { Typography } from "@mui/material";

import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerShopButton,
  BannerTitle,
} from "../../styles/banner";

const Banner = () => {
  return (
    <BannerContainer>
      <BannerImage src="/images/banner/banner2.jpg" />
      <BannerContent>
        <Typography variant="h6">New collection</Typography>
        <BannerTitle variant="h4">Spring 2023</BannerTitle>
        <BannerDescription variant="subtitle">
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem
        </BannerDescription>
        <BannerShopButton color="primary">Shop Now</BannerShopButton>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;
