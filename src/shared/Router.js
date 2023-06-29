import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Comments from '../comments/CommentsPage';
import Detail from '../pages/Detail';
import DetailEdit from '../pages/DetailEdit';
import DetailUpdate from '../components/DetailEdit/DetailUpdate';
// import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter>
      {/* <Layout> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Comments />} />
        <Route path="/detail" element={<DetailEdit />} />
        <Route path="/detail/update" element={<DetailUpdate />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
      {/* </Layout> */}
    </BrowserRouter>
  );
};

export default Router;
