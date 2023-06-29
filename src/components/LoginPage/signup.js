import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginDiv from "./loginCSS";
import firebase from "../../firebase.js";


function Signup() {
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");

  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  useEffect(() => {
    if (user.userid) {
      navigate("/");
    }
  }, [user, navigate]);

  const SignupFunc = async (e) => {
    e.preventDefault();
    let addCurrentUser = await firebase
    .auth().createUserWithEmailAndPassword(Email, PW);
    dispatch(addCurrentUser(addCurrentUser)); 
};

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <LoginDiv>
    <div>
      <label>이메일</label>
      <input
        type="email"
        id="email"
        placeholder="이메일을 입력하세요"
        value={Email}
        name="Email"
        onChange={(e) => setEmail(e.currentTarget.value)}
        required
      ></input>
      <label>비밀번호</label>
      <input
        type="password"
        id="password"
        placeholder="비밀번호"
        value={PW}
        name="password"
        onChange={(e) => setPW(e.currentTarget.value)}
        required
      ></input>
      <input
        type="password"
        id="confirmPassword"
        placeholder="비밀번호확인"
        value={PWConfirm}
        name="confirmPassword"
        onChange={(e) => setPWConfirm(e.currentTarget.value)}
        required
      ></input>

      <button type="submit" onClick={SignupFunc}>
        회원가입
      </button>

      <p>
        이미 회원이신가요? <button onClick={handleLogin}>로그인</button>
      </p>
    </div>
    </LoginDiv>
  );
}

export default Signup;