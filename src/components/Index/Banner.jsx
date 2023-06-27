import React from 'react';
import { styled } from 'styled-components';

const StyledBannerContainer = styled.div`
  width: 100%;
  height: 280px;
`;

const StyledBannerItem = styled.div``;

function Banner() {
  return (
    <StyledBannerContainer>
      <StyledBannerItem> Index 1</StyledBannerItem>
      <StyledBannerItem> Index 2</StyledBannerItem>
      <StyledBannerItem> Index 3</StyledBannerItem>
    </StyledBannerContainer>
  );
}

export default Banner;
