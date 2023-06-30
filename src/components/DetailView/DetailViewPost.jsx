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
    const todoRef = doc(db, 'posts', id);
    await deleteDoc(todoRef);

    navigate('/');
  };

  return (
    <PostLayout>
      <content>
        <div>
          <PostTitle>{post?.title}</PostTitle>
          <ContentBox>
            {/* p태그 공백 삭제 하지 말아주세요! */}
            <p>
              <Label>작성자명: </Label> {postNickname}
            </p>
            <br />
            <p>
              <Label>작성일: </Label>
              {post?.days}
            </p>
          </ContentBox>
        </div>
        <ContentBox>
          <p>
            <Label>주제별: </Label> {post?.category}
          </p>
          <br />
          <p>
            <Label>지역별: </Label> {post?.location}
          </p>
        </ContentBox>
        <ContentBox>
          <LabelContent>모임을 소개해주세요!</LabelContent>
          <ContentPostBox>{post?.content}</ContentPostBox>
          <ButtonBox>
            {userid == postUserid ? <button onClick={onEditButton}>수정</button> : null}
            {userid == postUserid ? <button onClick={onDelButton}>삭제</button> : null}
          </ButtonBox>
        </ContentBox>
      </content>
      <Comments postId={id} nickname={nickname} userid={userid} />
    </PostLayout>
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
  border-bottom: 2px solid #dedede;
  margin: 10px;
  padding: 10px;
`;

const ContentPostBox = styled.div`
  border-radius: 35px;
  border: 6px solid #ffcd4a;
  margin: 10px;
  padding: 20px;
  height: 400px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LabelContent = styled.label`
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
`;

const PostLayout = styled.div`
  margin-left: 385px;
  margin-right: 385px;
`;

const Label = styled.span`
  font-weight: 600;
`;
