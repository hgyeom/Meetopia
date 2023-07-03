import React from 'react';
import { styled } from 'styled-components';
import { Inner } from './Layout.styled';
import { StyledLink } from './Header.styled';

const Footer = () => {
  return (
    <FooterContainer>
      <Inner>
        <StyledLink to="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/meetopia-3d45e.appspot.com/o/logo.png?alt=media&token=54dfe689-637c-4cfc-a4a7-891623cd55d7"
            alt="MEETOPIA"
          />
        </StyledLink>
        <p className="p_caution">미토피아는 서비스 이용 중 발생한 문제에 대해 책임지지 않습니다.</p>
        <small>Copyright MEETOPIA All Rights Reserved.</small>
      </Inner>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  margin-top: 100px;
  padding: 54px 0 50px;
  background: #f6f6f6;
  line-height: 1.3;

  p {
    margin-top: 20px;
    font-size: 16px;
    color: #656565;
  }
  small {
    display: inline-block;
    margin-top: 8px;
    font-size: 14px;
    color: #949494;
  }
`;

export default Footer;
