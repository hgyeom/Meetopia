import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../components/LoginPage/Login.jsx';
import Signup from '../components/LoginPage/Signup.jsx';
import Mypage from '../pages/Mypage';
import Edit from '../pages/MypageEdit';
import Detail from '../pages/Detail';
import DetailEdit from '../pages/DetailEdit';
import DetailUpdate from '../components/DetailEdit/DetailUpdate';

import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCurrentUser } from '../redux/modules/users';
import Layout from '../components/Layout/Layout';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import GlobalStyle from '../GlobalStyle';

const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addCurrentUser(
            {
              userid: user.uid,
              email: user.email,
              nickname: user.displayName,
              profileImg: user.photoURL
            },
            true
          )
        );
      } else {
        dispatch(
          addCurrentUser(
            {
              userid: null,
              email: null,
              nickname: null,
              profileImg: null
            },
            false
          )
        );
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mypage/edit" element={<Edit />} />
            <Route path="/detail" element={<DetailEdit />} />
            <Route path="/detail/update" element={<DetailUpdate />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Router;
