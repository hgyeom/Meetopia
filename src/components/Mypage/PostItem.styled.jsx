import { styled } from 'styled-components';

export const StyledMainPost = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 23%;
  margin-top: 10px;
  padding: 20px 25px 0;
  width: 19%;
  height: 250px;
  border: 2px solid #d1d1d1;
  border-radius: 30px;
  background: #fff;
  cursor: pointer;

  transition: 0.2s ease-in;
  &.hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

export const StyledPostTitle = styled.div`
  margin-top: 20px;
  font-size: 17px;
  font-weight: 700;
  height: 35px;
`;

export const StyledPostContent = styled.div`
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

export const StyledPostUser = styled.div``;
