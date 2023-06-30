import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../firebase';
import { styled } from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import shortid from 'shortid';
import { useSelector } from 'react-redux';

function DetailPost() {
  const { nickname, userid } = useSelector((state) => {
    return state.users.currentUser;
  });

  const [posts, setPosts] = useState([]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [selectTopic, setSelectTopic] = useState('');
  const [selectLocation, setSelectLocation] = useState('');

  const navigate = useNavigate();

  // 주제별 select 박스
  const selectTopicList = [
    { value: '없음', name: '==선택==' },
    { value: '공부', name: '공부' },
    { value: '스포츠', name: '스포츠' },
    { value: '음악', name: '음악' },
    { value: '영화', name: '영화' },
    { value: '프로그래밍', name: '프로그래밍' },
    { value: '반려동물', name: '반려동물' },
    { value: '기타', name: '기타' }
  ];
  // 지역별 select 박스
  const selectLocationList = [
    { value: '없음', name: '==선택==' },
    { value: '서울', name: '서울' },
    { value: '경기', name: '경기' },
    { value: '인천', name: '인천' },
    { value: '대전', name: '대구' },
    { value: '부산', name: '부산' },
    { value: '울산', name: '울산' },
    { value: '광주', name: '광주' },
    { value: '강원', name: '강원' },
    { value: '세종', name: '세종' },
    { value: '충북', name: '충북' },
    { value: '충남', name: '충남' },
    { value: '경북', name: '경북' },
    { value: '경남', name: '경남' },
    { value: '전북', name: '전북' },
    { value: '전남', name: '전남' },
    { value: '제주', name: '제주' }
  ];

  //---------------------------------------
  //주제별 select 박스 값
  const handleSelectTopic = (event) => {
    setSelectTopic(event.target.value);
  };
  //지역별 select 박스 값
  const handleSelectLocation = (event) => {
    setSelectLocation(event.target.value);
  };

  //제목, 모임 소개 글 값
  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'title') {
      setTitle(value);
    }
    if (name === 'content') {
      setContent(value);
    }
  };

  //새로운 게시글 추가하기
  const addPost = async (event) => {
    event.preventDefault();
    const today = new Date();
    const newPost = {
      postId: shortid.generate(),
      title: title,
      content: content,
      category: selectTopic,
      location: selectLocation,
      userid: userid,
      nickname: nickname,
      days: today.toLocaleString()
    };

    if (!title || !content || selectTopic === '' || selectLocation === '') {
      alert('모든 내용을 입력해주세요.(제목, 내용, 카테고리)');
      return false;
    }
    setPosts(() => {
      return [...posts, newPost];
    });
    setTitle('');
    setContent('');
    setSelectTopic('');
    setSelectLocation('');

    const collectionRef = collection(db, 'posts');
    const docRef = await addDoc(collectionRef, newPost);
    const newDocId = docRef.id;
    navigate(`/detail/${newDocId}`);
  };
  return (
    <PostLayout>
      <MainTitle>[모임 만들기 글 작성]</MainTitle>
      <br />
      <content>
        <form onSubmit={addPost}>
          <ContentBox>
            <label>제목: </label>
            <input type="text" name="title" value={title} onChange={onChange} />
          </ContentBox>
          <ContentBox>
            주제별:
            <select name="category" value={selectTopic} onChange={handleSelectTopic}>
              {selectTopicList.map((item) => {
                return (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            지역별:
            <select name="location" value={selectLocation} onChange={handleSelectLocation}>
              {selectLocationList.map((item) => {
                return (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </ContentBox>
          <ContentWriteLabel>모임을 소개해주세요!</ContentWriteLabel>
          <ContentWriteBox>
            <textarea
              style={{
                resize: 'none'
              }}
              rows="30"
              cols="80"
              type="text"
              name="content"
              value={content}
              onChange={onChange}
            ></textarea>
          </ContentWriteBox>
          <BtnBox>
            <button>작성 완료</button>
            <Link to="/">
              <button>취소</button>
            </Link>
          </BtnBox>
        </form>
      </content>
    </PostLayout>
  );
}

export default DetailPost;

//css

const MainTitle = styled.h2`
  font-size: larger;
  font-weight: 600;
  margin: 10px;
`;

const ContentBox = styled.div`
  border-bottom: 4px solid #ffcd4a;
  margin: 10px;
  padding: 10px;
`;

const PostLayout = styled.div`
  margin-left: 385px;
  margin-right: 385px;
`;

const ContentWriteBox = styled.div`
  border-bottom: 4px solid #ffcd4a;
  margin: 10px;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const ContentWriteLabel = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  padding-top: 12px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;

  /* margin-right: 240px; */
  /* justify-content: center; */
`;
