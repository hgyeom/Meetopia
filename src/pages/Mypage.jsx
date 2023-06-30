import React from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from '../components/Mypage/Mypage.styled';
import Profile from '../components/Mypage/Profile';
import MyPosts from '../components/Mypage/MyPosts';

import { useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentUser } from '../redux/modules/users';
import { styled } from 'styled-components';

const Mypage = () => {
  const navigate = useNavigate();

  const onClickEditButtonHandler = () => {
    navigate('/mypage/edit');
  };

  useEffect(() => {
    // 1. 로그인하기
    // 테스트용 임시 로그인상태 만들기
    let [testEmail, testPassword] = ['asdf@asdf.com', '12341234'];
    const signIn = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword);
        // console.log('user with signIn', userCredential.user);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error with signIn', errorCode, errorMessage);
      }
    };
    signIn();
  }, []);

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
