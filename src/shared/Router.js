import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Comments from '../comments/CommentsPage';
import Detail from '../pages/Detail';
import DetailEdit from '../pages/DetailEdit';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Comments />} />
        <Route path="/detail" element={<DetailEdit />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
