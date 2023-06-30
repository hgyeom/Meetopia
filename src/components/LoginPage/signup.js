import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { addCurrentUser } from '../../redux/modules/users';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import LoginDiv from './loginCSS';

function Signup() {
  const navigate = useNavigate();

  const [Email, setEmail] = useState('');
  const [PW, setPW] = useState('');
  const [PWConfirm, setPWConfirm] = useState('');

  const signupFunc = async (event) => {
    event.preventDefault();

    // feat:: 비밀번호 확인 체크 코드 필요

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, Email, PW);

      // feat:: 닉네임(shortid), 기본프로필 이미지 url 넣어주는 셋팅
      // 그럴려면 기본 프로필 이미지를 구해다가 파이어스토리지에 넣어두고 url 값 가져와야 함

      // Signed in
      const user = userCredential.user;
      console.log('user with signUp', user);

      // feat:: 회원가입 완료 얼럿창 추가
      // navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signUp', errorCode, errorMessage);
    }
  };

  // const user = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (user?.userid) {
  //     navigate('/');
  //   }
  // }, [user, navigate]);

  // const SignupFunc = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { user: newUser } = await createUserWithEmailAndPassword(auth, Email, PW);
  //     dispatch(addCurrentUser(newUser));
  //   } catch (error) {
  //     // Handle error
  //     console.log(error);
  //   }
  // };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <LoginDiv>
      <form>
        <label>이메일</label>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={Email}
          name="Email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        ></input>
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호"
          value={PW}
          name="password"
          onChange={(e) => setPW(e.currentTarget.value)}
        ></input>
        <input
          type="password"
          placeholder="비밀번호확인"
          value={PWConfirm}
          name="PWConfirm"
          onChange={(e) => setPWConfirm(e.currentTarget.value)}
        ></input>
        <button onClick={signupFunc}> 회원가입</button>
        이미 회원이신가요? <button onClick={handleLogin}>로그인</button>
      </form>
    </LoginDiv>
  );
}

export default Signup;
