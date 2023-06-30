import React, { useRef, useEffect, useState } from 'react';
import { styled } from 'styled-components';

const bannerData = [
  {
    id: '1',
    alt: '1번',
    img: 'https://c4.wallpaperflare.com/wallpaper/647/923/709/landscape-mountain-clouds-fantasy-art-wallpaper-preview.jpg'
  },
  { id: '2', alt: '2번', img: 'https://cdn.travie.com/news/photo/first/201705/img_19694_12.jpg' },
  {
    id: '3',
    alt: '3번',
    img: 'https://coresos-phinf.pstatic.net/a/319d7c/1_a3gUd018svc9hbv4wslnbha_3e62pt.jpg?type=e1920_std'
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
`;

const StyledBannerItem = styled.div`
  width: 100vw;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 250px;
  object-fit: fill;
`;
