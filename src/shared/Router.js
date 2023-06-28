import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Mypage from '../pages/Mypage';
import Edit from '../pages/Edit';
// import Layout from './Layout';

const Router = () => {
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
