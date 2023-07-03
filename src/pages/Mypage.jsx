import React from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from '../components/Mypage/Mypage.styled';
import Profile from '../components/Mypage/Profile';
import MyPosts from '../components/Mypage/MyPosts';
import { ButtonXs, SubTitle, Title } from '../components/Common.styled';
import { useSelector } from 'react-redux';
import Topbutton from '../components/MainPage/TopButton';

const Mypage = () => {
  // Login Required
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => {
    return state.users;
  });
  if (!isLogin) navigate('/');

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
      <Topbutton />
    </S.MypageContainer>
  );
};

export default Mypage;
