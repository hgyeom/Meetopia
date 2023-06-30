import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../components/LoginPage/login';
import Signup from '../components/LoginPage/signup';
import Mypage from '../pages/Mypage';
import Edit from '../pages/MypageEdit';
import Comments from '../components/CommentsPage';
import Detail from '../pages/Detail';
import DetailEdit from '../pages/DetailEdit';
import DetailUpdate from '../components/DetailEdit/DetailUpdate';
import NotFound from '../pages/NotFound';

import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCurrentUser } from '../redux/modules/users';
import Layout from '../components/Layout/Layout';

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
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/edit" element={<Edit />} />
          <Route path="/:id" element={<Comments />} />
          <Route path="/detail" element={<DetailEdit />} />
          <Route path="/detail/update" element={<DetailUpdate />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
