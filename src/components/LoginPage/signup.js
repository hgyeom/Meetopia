import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { addCurrentUser } from "../../redux/modules/users";
import { createUserWithEmailAndPassword} from "firebase/auth"
import LoginDiv from "./loginCSS";



function Signup() {
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.userid) {
      navigate("/");
    }
  }, [user, navigate]);

  const SignupFunc = async (e) => {
    e.preventDefault();
    try {
      const { user: newUser } = await createUserWithEmailAndPassword(
        auth,
        Email,
        PW
      );
      dispatch(addCurrentUser(newUser));
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
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

      <button onClick={(e)=>Signup}> 회원가입</button>
        이미 회원이신가요? <button onClick={handleLogin}>로그인</button>
    </form>
    </LoginDiv>
  );
}

export default Signup;