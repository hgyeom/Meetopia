import React from 'react';
import * as S from './Header.styled.jsx';
import { Link } from 'react-router-dom';

const LogoutMenu = () => {
  return (
    <>
      <S.HeaderNavButton>
        <Link
          to="/login"
          style={{
            textDecoration: 'none',
            color: 'black'
          }}
        >
          로그인
        </Link>
      </S.HeaderNavButton>
    </>
  );
};

export default LogoutMenu;
