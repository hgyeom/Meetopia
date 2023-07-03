import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { filterdPosts, initialData } from '../../redux/modules/posts';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { db } from '../../firebase';
import PostItem from './PostItem';

function List() {
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);
  const posts = useSelector((state) => state.posts);
  const category = useSelector((state) => state.category);
  const location = useSelector((state) => state.location);

  // firebase 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'posts'), orderBy('days', 'desc'));
      const querySnapshot = await getDocs(q);
      const initialPosts = [];
      querySnapshot.forEach((doc) => {
        initialPosts.push({ id: doc.id, ...doc.data() });
      });
      setAllPosts(initialPosts);
      dispatch(initialData(initialPosts));
    };
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(filterdPosts({ category, allPosts, location }));
  }, [category, location]);

  return (
    <div>
      <StyledMainposts>
        {posts.map((post) => {
          return <PostItem post={post} key={post.id} />;
        })}
      </StyledMainposts>
    </div>
  );
}

export default List;

const StyledMainposts = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  grid-gap: 27px;
  gap: 27px;
  flex-wrap: wrap;
  padding: 0;
`;
