import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginDiv from "./loginCSS";
import firebase from "../../firebase";

function Login () {

    const [Email, setEmail] = useState("");
    const [PW, setPW] = useState("");
    const [ErrorMsg, setErrorMsg] = useState("");

    const user = useSelector((state) => state.user);
    let navigate = useNavigate();

    const SignInFunc = async (e) => {
      e.preventDefault();
      if (!(Email || PW)) {
        return alert("모든 값을 채워주세요.");
      }
      try {
        await firebase.auth().signInWithEmailAndPassword(Email, PW);
        dispatch(addCurrentUser({ email: Email }));
        navigate("/");
      } catch (error) {
        console.log(error.code);
        if (error.code === "auth/user-not-found") {
          setErrorMsg("존재하지 않는 이메일입니다.");
        } else if (error.code === "auth/wrong-password") {
          setErrorMsg("비밀번호가 일치하지 않습니다.");
        } else {
          setErrorMsg("로그인이 실패하였습니다.");
        }
      }
    };
  
    useEffect(() => {
      if (user.userid) {
        navigate("/");
      }
    }, [user, navigate]);
  
    useEffect(() => {
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    }, [ErrorMsg]);
  


    return (
        <LoginDiv>
         <form>       
            <input
            type="email"
            placeholder="이메일"
            value={Email}
            name="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          ></input>
        <div>
          <input
            type="password"
            placeholder="비밀번호"
            value={PW}
            name="password"
            onChange={(e) => setPW(e.currentTarget.value)}
            required
          ></input>
        </div>
        {ErrorMsg != "" || <p>{ErrorMsg}</p>}
        <div><button onClick={(e)=>SignInFunc}>로그인</button></div>
        <div>가입을 안하셨나요? 
          <button 
        onClick={(e) => {
          e.preventDefault();
          navigate("/signup");
        }}
        >
          회원가입
          </button>
          </div>
        </form>
        </LoginDiv>
    );
}

export default Login;