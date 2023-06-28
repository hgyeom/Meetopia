import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Comments from '../comments/CommentsPage';
import Detail from '../pages/Detail';
import DetailEdit from '../pages/DetailEdit';
// import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter>
      {/* <Layout> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Comments />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/detail" element={<DetailEdit />} />
      </Routes>
      {/* </Layout> */}
    </BrowserRouter>
  );
};

export default Router;
