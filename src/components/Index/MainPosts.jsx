import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
// import { useSelector, useDispatch } from 'react-redux';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';

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
  justify-content: center;
  padding: 20px 25px 0;
  width: 17%;
  height: 250px;
  background: #fff;
  border: 2px solid #d1d1d1;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
  transition: 0.2s ease-in;
  &.hover {
    transform: scale(1.02);
  }
`;

function List() {
  // const dispatch = useDispatch();
  // redux 사용시
  // const posts = useSelector((state) => state);
  // useEffect(() => {
  // dispatch({
  //   type: 'READ_ALL_POSTS',
  //   payload: ''
  // });
  // console.log(posts);},[])

  const [posts, setPosts] = useState([]);

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

  console.log(posts);

  return (
    <StyledMain>
      <StyledMainNav>
        <select>
          <option>경기</option>
          <option>서울</option>
        </select>
        <button>dd</button>
      </StyledMainNav>
      <StyledMainposts>
        {posts.map((post) => {
          return (
            <StyledMainPost key={post.postId}>
              <p>{post.title}</p>
              <p>{post.userId}</p>
              <p>{post.category}</p>
            </StyledMainPost>
          );
        })}
      </StyledMainposts>
    </StyledMain>
  );
}

export default List;
