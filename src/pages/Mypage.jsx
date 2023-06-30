import React from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from '../components/Mypage/Mypage.styled';
import Profile from '../components/Mypage/Profile';
import MyPosts from '../components/Mypage/MyPosts';
import { ButtonXs, SubTitle, Title } from '../components/Common.styled';

const Mypage = () => {
  const navigate = useNavigate();

  const onClickEditButtonHandler = () => {
    navigate('/mypage/edit');
  };

  return (
    <S.MypageContainer>
      <Title>Mypage</Title>
      <S.TitleBox>
        <SubTitle>기본 회원 정보</SubTitle>
        <ButtonXs onClick={onClickEditButtonHandler}>수정</ButtonXs>
      </S.TitleBox>
      <Profile />
      <SubTitle>내 작성글</SubTitle>
      <MyPosts />
    </S.MypageContainer>
  );
};

export default Mypage;
