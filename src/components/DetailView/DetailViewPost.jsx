import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { React, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import Comments from '../CommentsPage';
import * as S from './DetailViewPost.styled';
import { ButtonXs, ButtonXsGray } from '../Common.styled';

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
    <div>
      <section>
        <div>
          <S.PostTitle>{post?.title}</S.PostTitle>
          <S.ContentBox>
            {/* p태그 공백 삭제 하지 말아주세요! */}
            <p>
              <S.Label>작성자명: </S.Label> {postNickname}
            </p>
            <br />
            <p>
              <S.Label>작성일: </S.Label>
              {post?.days}
            </p>
          </S.ContentBox>
        </div>
        <S.ContentBox>
          <p>
            <S.Label>주제별: </S.Label> {post?.category}
          </p>
          <br />
          <p>
            <S.Label>지역별: </S.Label> {post?.location}
          </p>
        </S.ContentBox>
        <S.ContentBox>
          <S.LabelContent>모임을 소개해주세요!</S.LabelContent>
          <S.ContentPostBox>{post?.content}</S.ContentPostBox>
          <S.ButtonBox>
            {userid == postUserid ? <ButtonXs onClick={onEditButton}>수정</ButtonXs> : null}
            {userid == postUserid ? <ButtonXsGray onClick={onDelButton}>삭제</ButtonXsGray> : null}
          </S.ButtonBox>
        </S.ContentBox>
      </section>
      <Comments postId={id} nickname={nickname} userid={userid} />
    </div>
  );
}

export default DetailViewPost;
