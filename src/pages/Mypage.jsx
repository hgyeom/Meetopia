import React from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from '../components/Mypage/Mypage.styled';
import Profile from '../components/Mypage/Profile';
import MyPosts from '../components/Mypage/MyPosts';

const Mypage = () => {
  const navigate = useNavigate();

  const onClickEditButtonHandler = () => {
    navigate('/mypage/edit');
  };

  return (
    <S.MypageContainer>
      <S.Title>Mypage</S.Title>
      <S.TitleBox>
        <S.SubTitle>기본 회원 정보</S.SubTitle>
        <button onClick={onClickEditButtonHandler}>수정</button>
      </S.TitleBox>
      <Profile />
      <S.SubTitle>내 작성글</S.SubTitle>
      <MyPosts />
    </S.MypageContainer>
  );
};

export default Mypage;
