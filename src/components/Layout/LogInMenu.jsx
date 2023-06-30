import React from 'react';
import { useSelector } from 'react-redux';
import * as S from './Header.styled.jsx';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from '@firebase/auth';

const LogInMenu = () => {
  const { nickname, profileImg } = useSelector((state) => {
    return state.users.currentUser;
  });

  const logOut = async (event) => {
    event.preventDefault();
    await signOut(auth);
  };

  return (
    <>
      <S.HeaderNavButton>
        <Link
          to="/detail"
          style={{
            textDecoration: 'none',
            color: 'black'
          }}
        >
          새 글 쓰기
        </Link>
      </S.HeaderNavButton>
      <S.HeaderNavButton>
        <Link
          onClick={logOut}
          style={{
            textDecoration: 'none',
            color: 'black'
          }}
        >
          로그아웃
        </Link>
      </S.HeaderNavButton>
      <S.ProfileLink to="/mypage">
        <S.ImgBoxSM>
          <img src={profileImg} alt="프로필 사진" />
        </S.ImgBoxSM>
        {nickname}
      </S.ProfileLink>
    </>
  );
};

export default LogInMenu;