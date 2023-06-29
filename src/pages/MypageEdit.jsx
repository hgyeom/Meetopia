import React from 'react';
import ProfileForm from '../components/Mypage/ProfileForm';
import { S } from '../components/Mypage/Mypage.styled';

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
