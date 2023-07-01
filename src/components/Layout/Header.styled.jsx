import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const Header = styled.header`
  margin: auto;
  max-width: ${(props) => props.theme.contentWidth};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
  padding: 0 40px;

  font-weight: 800;
  font-size: 1.5rem;
`;

export const StyledLink = styled(Link)`
  display: inline-block;
  height: 36px;
  text-decoration: none;
  color: black;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const HeaderNav = styled.div`
  display: flex;
  gap: 24px;
`;

export const HeaderNavButton = styled.button`
  font-weight: 600;
  font-size: 1.125rem;
  outline: none;
  border: none;
  background-color: #fff;
  cursor: pointer;
`;

export const ProfileImgBoxSM = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
  overflow: hidden;
  width: 46px;
  height: 46px;
  margin: 16px 0;
  border-radius: 100%;

  img {
    width: 100%;
  }
`;

export const ProfileLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 8px;
  color: inherit;
  font-size: 16px;
  font-weight: 400;
`;
