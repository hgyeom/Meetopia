import React from 'react';
import * as S from './PostItem.styled';

const PostItem = ({ post }) => {
  return (
    <S.StyledMainPost key={post.postId}>
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
