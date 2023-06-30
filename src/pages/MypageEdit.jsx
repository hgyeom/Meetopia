import React from 'react';
import ProfileForm from '../components/Mypage/ProfileForm';
import { S } from '../components/Mypage/Mypage.styled';
import { SubTitle, Title } from '../components/Common.styled';

const Edit = () => {
  return (
    <div>
      <S.MypageContainer>
        <Title>Mypage</Title>
        <SubTitle>회원 정보 수정</SubTitle>
        <ProfileForm />
      </S.MypageContainer>
    </div>
  );
};

export default Edit;
