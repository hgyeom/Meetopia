import React, { useRef, useEffect, useState } from 'react';
import { styled } from 'styled-components';

const bannerData = [
  {
    id: '1',
    alt: '1번',
    img: 'https://cdn.discordapp.com/attachments/824139315830980612/1124239325681430619/Meetopia-001.png'
  },
  {
    id: '2',
    alt: '2번',
    img: 'https://cdn.discordapp.com/attachments/824139315830980612/1124237008848564285/meetopia_banner_2.png'
  },
  {
    id: '3',
    alt: '3번',
    img: 'https://cdn.discordapp.com/attachments/824139315830980612/1124237008051646515/meetopia_banner_3.png'
  }
];

function Banner() {
  const myRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerData.length);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <StyledBannerContainer>
      <StyledBannerItems currentindex={currentIndex} totalitems={bannerData.length} ref={myRef}>
        {bannerData.map((item) => (
          <StyledBannerItem key={item.id}>
            <StyledImg alt={item.alt} src={item.img} />
          </StyledBannerItem>
        ))}
      </StyledBannerItems>
    </StyledBannerContainer>
  );
}

export default Banner;

const StyledBannerContainer = styled.div`
  overflow: hidden;
`;

const StyledBannerItems = styled.div`
  width: ${(props) => props.totalitems * 100}vw;
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(-${(props) => props.currentindex * 100}vw);
  /* transform: translateX(-${(props) => props.currentindex * props.theme.contentWidth}); */
`;

const StyledBannerItem = styled.div`
  width: 100vw;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 360px;
  object-fit: fill;
`;
