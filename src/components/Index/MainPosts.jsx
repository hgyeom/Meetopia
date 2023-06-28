import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
import Location from './Location';

function List() {
  const [posts, setPosts] = useState([]);
  const category = useSelector((state) => state.category);
  const location = useSelector((state) => state.location);

  // firebase 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'posts'));
      const querySnapshot = await getDocs(q);
      const initialPosts = [];
      querySnapshot.forEach((doc) => {
        initialPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(initialPosts);
    };
    fetchData();
  }, []);

  return (
    <StyledMain>
      <StyledMainNav>
        <Location />
        <button>dd</button>
      </StyledMainNav>
      <StyledMainposts>
        {category !== '모두보기'
          ? location !== '모두보기'
            ? posts
                .filter((item) => item.category === category)
                .filter((item) => item.location === location)
                .map((post) => {
                  return (
                    <StyledMainPost key={post.postId}>
                      <StyledPostTitle>{post.title}</StyledPostTitle>
                      <div>
                        <StyledPostContent>{post.content}</StyledPostContent>
                        <hr />
                        <StyledPostUser>{post.nickname}</StyledPostUser>
                        <p>{post.category}</p>
                      </div>
                    </StyledMainPost>
                  );
                })
            : posts
                .filter((item) => item.category === category)
                .map((post) => {
                  return (
                    <StyledMainPost key={post.postId}>
                      <StyledPostTitle>{post.title}</StyledPostTitle>
                      <div>
                        <StyledPostContent>{post.content}</StyledPostContent>
                        <hr />
                        <StyledPostUser>{post.nickname}</StyledPostUser>
                        <p>{post.category}</p>
                      </div>
                    </StyledMainPost>
                  );
                })
          : location !== '모두보기'
          ? posts
              .filter((item) => item.location === location)
              .map((post) => {
                return (
                  <StyledMainPost key={post.postId}>
                    <StyledPostTitle>{post.title}</StyledPostTitle>
                    <div>
                      <StyledPostContent>{post.content}</StyledPostContent>
                      <hr />
                      <StyledPostUser>{post.nickname}</StyledPostUser>
                      <p>{post.category}</p>
                    </div>
                  </StyledMainPost>
                );
              })
          : posts.map((post) => {
              return (
                <StyledMainPost key={post.postId}>
                  <StyledPostTitle>{post.title}</StyledPostTitle>
                  <div>
                    <StyledPostContent>{post.content}</StyledPostContent>
                    <hr />
                    <StyledPostUser>{post.nickname}</StyledPostUser>
                    <p>{post.category}</p>
                  </div>
                </StyledMainPost>
              );
            })}
      </StyledMainposts>
    </StyledMain>
  );
}

export default List;

const StyledMain = styled.main``;

const StyledMainNav = styled.div`
  max-width: 1300px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  border: 1px solid #d7b0ff;
  height: 80px;
`;

const StyledMainposts = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  grid-gap: 27px;
  gap: 27px;
  flex-wrap: wrap;
  padding: 0;
`;

const StyledMainPost = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  padding: 20px 25px 0;
  width: 19%;
  height: 250px;
  background: #fff;
  border: 2px solid #d1d1d1;
  border-radius: 30px;

  transition: 0.2s ease-in;
  &.hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

const StyledPostTitle = styled.div`
  margin-top: 20px;
  font-size: 17px;
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

const StyledPostUser = styled.div``;
