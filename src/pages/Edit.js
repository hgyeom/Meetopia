import React from 'react';
import ProfileForm from './ProfileForm';
import { S } from './Mypage.styled';

const Edit = () => {
  return (
    <div>
      <S.MypageContainer>
        <S.Title>Mypage</S.Title>
        <S.SubTitle>회원 정보 수정</S.SubTitle>
        <ProfileForm />
      </S.MypageContainer>
    </div>
  );
};

export default Edit;
