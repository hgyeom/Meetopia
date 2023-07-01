import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Inner } from './Layout.styled';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Inner>{children}</Inner>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
