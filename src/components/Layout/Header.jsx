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
      <S.StyledLink to="/">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/meetopia-3d45e.appspot.com/o/logo.png?alt=media&token=54dfe689-637c-4cfc-a4a7-891623cd55d7"
          alt="MEETOPIA"
        />
      </S.StyledLink>
      <S.HeaderNav>{isLogin ? <LogInMenu /> : <LogoutMenu />}</S.HeaderNav>
    </S.Header>
  );
}

export default Header;
