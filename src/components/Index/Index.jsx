import React from 'react';
// import { styled } from 'styled-components';
import Banner from './Banner';
import Category from './Category';
import MainPosts from './MainPosts';
// const StyledIndexContainer = styled.div``;

function Index() {
  return (
    <div>
      <Banner />
      <Category />
      <MainPosts />
    </div>
  );
}

export default Index;
