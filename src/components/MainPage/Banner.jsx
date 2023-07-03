import React, { useRef, useEffect, useState } from 'react';
import { styled } from 'styled-components';

const bannerData = [
  {
    id: '1',
    alt: '1번',
    img: 'https://firebasestorage.googleapis.com/v0/b/meetopia-detail.appspot.com/o/Meetopia-001.png?alt=media&token=d399ae16-c8b2-437a-8107-1aa1f064700b'
  },
  {
    id: '2',
    alt: '2번',
    img: 'https://firebasestorage.googleapis.com/v0/b/meetopia-detail.appspot.com/o/meetopia-002.png?alt=media&token=5a1c9285-9a78-4841-b3c8-db0dd30ba862'
  },
  {
    id: '3',
    alt: '3번',
    img: 'https://firebasestorage.googleapis.com/v0/b/meetopia-detail.appspot.com/o/meetopia-003.png?alt=media&token=ba123605-e5f8-468a-91fc-935ddedfb033'
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
  position: relative;
  width: 100vw;
  left: 50%;
  translate: -50% 0;
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
  height: 360px;
  object-fit: fill;
`;
