import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Mypage from '../pages/Mypage';
import Edit from '../pages/Edit';
// import Layout from './Layout';

import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCurrentUser } from '../redux/modules/users';

const Router = () => {
  const dispatch = useDispatch();

  console.log('APP!');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(
        addCurrentUser({
          userid: user.uid,
          email: user.email,
          nickname: user.displayName,
          profileImg: user.photoURL
        })
      );
      // console.log('현재 로그인한 유저의 정보3', auth.currentUser);
      // console.log(user.uid);
      // console.log(user.displayName);
    });
  }, []);

  return (
    <BrowserRouter>
      {/* <Layout> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/users/:id" element={<Mypage />} /> */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/edit" element={<Edit />} />
      </Routes>
      {/* </Layout> */}
    </BrowserRouter>
  );
};

export default Router;
