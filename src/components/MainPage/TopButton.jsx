import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

function Topbutton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <ButtonContainer>
        <TopButton id="top" onClick={scrollToTop} type="button">
          Top
        </TopButton>
      </ButtonContainer>
    )
  );
}
export default Topbutton;

const ButtonContainer = styled.div`
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 1;
`;

const TopButton = styled.button`
  height: 75px;
  width: 75px;
  border-radius: 50%;
  border: none;
  background-color: #ffcd4a;
  font-size: large;
  font-weight: 600;
  cursor: pointer;
`;
