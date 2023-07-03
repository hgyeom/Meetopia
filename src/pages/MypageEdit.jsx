import React from 'react';
import ProfileForm from '../components/Mypage/ProfileForm';
import { S } from '../components/Mypage/Mypage.styled';
import { SubTitle, Title } from '../components/Common.styled';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Edit = () => {
  // Login Required
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => {
    return state.users;
  });
  if (!isLogin) navigate('/');

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
