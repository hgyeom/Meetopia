import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const HeaderNavButton = styled.button`
  font-weight: 600;
  font-size: 1.125rem;
  outline: none;
  border: none;
  background-color: #fff;
  cursor: pointer;
`;

export const ImgBoxSM = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
  overflow: hidden;
  width: 54px;
  height: 54px;
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
`;
