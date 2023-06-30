import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import LoginDiv from './Loginpage.styled';
import shortid from 'shortid';

function Signup() {
  const navigate = useNavigate();

  const [Email, setEmail] = useState('');
  const [PW, setPW] = useState('');
  const [PWConfirm, setPWConfirm] = useState('');

  const signupFunc = async (event) => {
    event.preventDefault();

    if (PW !== PWConfirm) return alert('비밀번호와 비밀번호 확인이 다릅니다!');
    if (PW.length < 6) return alert('비밀번호 6자리 이상 입력 해주세요!');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, Email, PW);

      let nickname = shortid.generate();
      const PRROFILE_IMG =
        'https://firebasestorage.googleapis.com/v0/b/meetopia-5eb69.appspot.com/o/profile.png?alt=media&token=99a0a3e3-6ebf-4eba-a600-f1fce3405617 ';
      await updateProfile(auth.currentUser, {
        displayName: nickname,
        photoURL: PRROFILE_IMG
      });

      // Signed in
      const user = userCredential.user;
      console.log('user with signUp', user);

      alert('회원가입 완료!');
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signUp', errorCode, errorMessage);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    
    <LoginDiv>
      <form>
        <span>Sign Up</span>
        <label>EMAIL</label>
        <input
          type="email"
          placeholder="이메일을 입력하세요."
          value={Email}
          name="Email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        ></input>
        <label >PASSWORD</label>
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
        <br></br>
        <button onClick={signupFunc}> 회원가입</button><br></br>
        <p>이미 회원이신가요?😀</p> <button onClick={handleLogin}>로그인</button>
        </form>
    </LoginDiv>
    
  );
}

export default Signup;
