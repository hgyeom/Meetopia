import React from 'react';
import { S } from './Profile.styled';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { email, nickname, profileImg } = useSelector((state) => {
    return state.users.currentUser;
  });

  return (
    <form>
      <S.ProfileBox>
        <S.ImgBox>
          <img src={profileImg} alt="프로필 사진" />
        </S.ImgBox>
        <S.RowBox>
          <S.Row>
            <label>이메일</label>
            <div>{email}</div>
          </S.Row>
          <S.Row>
            <label>닉네임</label>
            <div>{nickname}</div>
          </S.Row>
        </S.RowBox>
      </S.ProfileBox>
    </form>
  );
};

export default Profile;
