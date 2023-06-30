import React from 'react';
import { styled } from 'styled-components';
import '../reset.css';
import { Link } from 'react-router-dom';

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

const StyledHeaderNav = styled.div``;

const StyledHeaderNavButton = styled.button`
  font-weight: 600;
  font-size: 1.125rem;
  outline: none;
  border: none;
  background-color: #fff;
  cursor: pointer;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledLink to="/">MEETOPIA</StyledLink>
      <StyledHeaderNav>
        <StyledHeaderNavButton>
          <Link
            to="/detail"
            style={{
              textDecoration: 'none',
              color: 'black'
            }}
          >
            새 글 쓰기
          </Link>
        </StyledHeaderNavButton>
        <StyledHeaderNavButton>
          <Link
          to="/login"
          style={{
            textDecoration: 'none',
            color: 'black'
          }}>
          로그인</Link>
          </StyledHeaderNavButton>
      </StyledHeaderNav>
    </StyledHeader>
  );
}

export default Header;
