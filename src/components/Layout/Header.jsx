import React from 'react';
import { useSelector } from 'react-redux';
import LogInMenu from './LogInMenu';
import LogoutMenu from './LogoutMenu';
import * as S from './Header.styled';

function Header() {
  const { isLogin } = useSelector((state) => {
    return state.users;
  });

  return (
    <S.Header>
      <S.StyledLink to="/">MEETOPIA</S.StyledLink>
      <S.HeaderNav>{isLogin ? <LogInMenu /> : <LogoutMenu />}</S.HeaderNav>
    </S.Header>
  );
}

export default Header;
