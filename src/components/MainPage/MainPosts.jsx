import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { filterdPosts, initialData } from '../../redux/modules/posts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import Location from './Location';
import { db } from '../../firebase';

function List() {
  const navigate = useNavigate();
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
    <StyledMain>
      <StyledMainNav>
        <Loctionlabel>지역</Loctionlabel>
        <Location />
      </StyledMainNav>
      <StyledMainposts>
        {posts.map((post) => {
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
                <StyledPostUser>{post.nickname}</StyledPostUser>
                <StyledPostInfo>
                  #{post.category} #{post.location}
                </StyledPostInfo>
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
  flex-direction: column;
  justify-content: center;

  gap: 10px;
  margin: 0 auto;
  border: 2px solid #ffcd4a;
  border-radius: 5px;
  height: 60px;
  padding: 13px;
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

const StyledPostUser = styled.div``;
const StyledPostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
  font-weight: 600;
`;

const Loctionlabel = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
`;
