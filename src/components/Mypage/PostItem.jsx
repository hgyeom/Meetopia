import React from 'react';
import * as S from './PostItem.styled';
import { useNavigate } from 'react-router';

const PostItem = ({ post }) => {
  const navigate = useNavigate();

  return (
    <S.StyledMainPost
      onClick={() => {
        navigate('/detail/' + post.id);
      }}
    >
      <S.StyledPostTitle>{post.title}</S.StyledPostTitle>
      <div>
        <S.StyledPostContent>{post.content}</S.StyledPostContent>
        <hr />
        <S.StyledPostUser>{post.nickname}</S.StyledPostUser>
        <p>{post.category}</p>
      </div>
    </S.StyledMainPost>
  );
};

export default PostItem;
