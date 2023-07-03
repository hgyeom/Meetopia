import React from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router';

const PostItem = ({ post }) => {
  const navigate = useNavigate();
  return (
    <StyledMainPost
      key={post.postId}
      onClick={() => {
        navigate('/detail/' + post.id);
      }}
    >
      <StyledPostTitle>{post.title}</StyledPostTitle>
      <div>
        <StyledPostContent>{post.content}</StyledPostContent>
        <hr />
        <StyledPostInfo>
          #{post.category} #{post.location}
        </StyledPostInfo>
        <StyledPostUserInfo>
          {post.nickname}
          <img src={post.profileImg} alt="프로필 사진" />
        </StyledPostUserInfo>
      </div>
    </StyledMainPost>
  );
};

export default PostItem;

const StyledMainPost = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  padding: 20px 25px 0;
  width: 19%;
  min-width: 200px;
  height: 250px;
  background: #fff;
  border: 2px solid #dedede;
  border-radius: 30px;
  cursor: pointer;
`;

const StyledPostTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
  height: 35px;
`;

const StyledPostContent = styled.div`
  font-size: 15px;
  min-height: 100px;
  line-height: 25px;
  letter-spacing: -0.05em;
  margin: 10px 0 10px;

  // 말줄임을 위한 css
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
`;

const StyledPostInfo = styled.div`
  display: flex;
  padding-top: 8px;
  font-weight: 600;
`;

const StyledPostUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  margin-top: 10px;
  > img {
    width: 40px;
    margin-bottom: 10px;
  }
`;
