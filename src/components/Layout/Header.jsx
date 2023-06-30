import React from 'react';
import { styled } from 'styled-components';
import '../../reset.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogInMenu from './LogInMenu';
import LogoutMenu from './LogoutMenu';

const StyledHeader = styled.header`
  margin: auto;
  max-width: 1180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
  padding: 0 10px;

  font-weight: 800;
  font-size: 1.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  color: black;
`;

const StyledHeaderNav = styled.div`
  display: flex;
  gap: 24px;
`;

function Header() {
  const { isLogin } = useSelector((state) => {
    return state.users;
  });
  const test = useSelector((state) => {
    return state.users;
  });
  console.log('isLogin ==============>⭐⭐⭐⭐⭐➡️➡️➡️➡️➡️ ', isLogin);

  return (
    <StyledHeader>
      <StyledLink to="/">MEETOPIA</StyledLink>
      <StyledHeaderNav>{isLogin ? <LogInMenu /> : <LogoutMenu />}</StyledHeaderNav>
    </StyledHeader>
  );
}

export default Header;