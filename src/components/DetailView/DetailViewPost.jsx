import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { React, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import Comments from '../CommentsPage';

function DetailViewPost() {
  const { nickname, userid } = useSelector((state) => {
    return state.users.currentUser;
  });
  const [posts, setPosts] = useState([]);
  const [postUserid, setPostUserid] = useState('');
  const [postNickname, setPostNickname] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  //firebase 'posts' 데이터 읽어오기
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'posts'));
      const querySnapshot = await getDocs(q);

      const initialPosts = [];
      querySnapshot.forEach((doc) => {
        initialPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(initialPosts);

      // 포스트의 유저아이디값 저장하기
      let filtered = initialPosts.find((item) => item.id === id);
      setPostUserid(filtered.userid);
      setPostNickname(filtered.nickname || '닉네임없음');
    };
    fetchData();
  }, []);

  const post = posts.find((item) => item.id === id);
  console.log('posts', posts);

  //수정 버튼 누르면 수정하는 페이지로
  const onEditButton = () => {
    navigate(`/detail/update`, {
      state: {
        postId: id
      }
    });
  };

  // 👇👇👇👇👇👇
  const onDelButton = async () => {
    // DB에서 삭제
    console.log(id);
    const todoRef = doc(db, 'posts', id);
    await deleteDoc(todoRef);

    // navigate(-1);
    navigate('/');
  };

  return (
    <div
      style={{
        margin: '30px'
      }}
    >
      <content>
        <div>
          <PostTitle>{post?.title}</PostTitle>
          <ContentBox>
            {/* <label>작성자명:{nickname}</label> */}
            <label>작성자명:{postNickname}</label>
            {/* 작성자이름 받아오기 */}
            <label>작성일:</label>
            {post?.days}

            {userid == postUserid ? <button onClick={onEditButton}>수정</button> : null}
            {userid == postUserid ? <button onClick={onDelButton}>삭제</button> : null}
          </ContentBox>
        </div>
        <ContentBox>
          주제별:{post?.category} 지역별:{post?.location}
        </ContentBox>
        <ContentBox>
          <label>모임을 소개해주세요!</label>
          <ContentPostBox>{post?.content}</ContentPostBox>
        </ContentBox>
      </content>
      <Comments postId={id} nickname={nickname} userid={userid} />
    </div>
  );
}

export default DetailViewPost;

const PostTitle = styled.p`
  font-size: xx-large;
  font-weight: 800;
  margin: 10px;
  margin-bottom: 13px;
`;

const ContentBox = styled.div`
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
`;

const ContentPostBox = styled.div`
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
  height: 400px;
`;
