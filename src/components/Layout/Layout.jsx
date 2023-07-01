import React from 'react';
import Header from './Header';
import { styled } from 'styled-components';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <S.Container>{children}</S.Container>
    </>
  );
};

const S = {
  Container: styled.div`
    max-width: ${(props) => props.theme.contentWidth};
    margin: 0 auto;
    padding: 28px 40px;
  `
};

export default Layout;
