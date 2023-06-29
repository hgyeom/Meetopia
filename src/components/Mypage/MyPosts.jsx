import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';
// import Location from './Location';
import PostItem from './PostItem';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  // firebase 데이터 가져오기
  const { userid } = useSelector((state) => {
    return state.users.currentUser;
  });

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'posts'));
      const querySnapshot = await getDocs(q);
      const userPosts = [];
      querySnapshot.forEach((doc) => {
        let datas = doc.data();
        datas.userid === userid && userPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(userPosts);
    };
    fetchData();
  }, [userid]);

  return (
    <PostsContainer>
      {posts.map((post) => {
        return <PostItem post={post} />;
      })}
    </PostsContainer>
  );
};

export default MyPosts;

const PostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 27px;
  gap: 27px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
`;
