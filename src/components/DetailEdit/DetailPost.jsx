import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import shortid from 'shortid';
import { useSelector } from 'react-redux';
import * as S from './DetailPost.styled';
import { Button, ButtonGray, Input, Select, SubTitle, Textarea } from '../Common.styled';

function DetailPost() {
  const { nickname, userid, profileImg } = useSelector((state) => {
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
    { value: '대전', name: '대전' },
    { value: '대구', name: '대구' },
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
      title,
      content,
      category: selectTopic,
      location: selectLocation,
      userid,
      nickname,
      profileImg,
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
    <div>
      {/* <S.MainTitle>[모임 만들기 글 작성]</S.MainTitle> */}
      <SubTitle>모임 만들기 글 작성</SubTitle>
      <br />
      <section>
        <form onSubmit={addPost}>
          <S.ContentBox>
            <label>제목: </label>
            <Input type="text" name="title" value={title} onChange={onChange} />
          </S.ContentBox>
          <S.ContentBox>
            <label>주제별: </label>
            <Select name="category" value={selectTopic} onChange={handleSelectTopic}>
              {selectTopicList.map((item) => {
                return (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </Select>
            <label>지역별: </label>
            <Select name="location" value={selectLocation} onChange={handleSelectLocation}>
              {selectLocationList.map((item) => {
                return (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </Select>
          </S.ContentBox>
          <S.ContentWriteLabel>모임을 소개해주세요!</S.ContentWriteLabel>
          <S.ContentWriteBox>
            <Textarea
              style={{
                resize: 'none'
              }}
              rows="30"
              cols="80"
              type="text"
              name="content"
              value={content}
              onChange={onChange}
            ></Textarea>
          </S.ContentWriteBox>
          <S.BtnBox>
            <ButtonGray onClick={() => navigate('/')}>취소</ButtonGray>
            <Button>작성 완료</Button>
          </S.BtnBox>
        </form>
      </section>
    </div>
  );
}

export default DetailPost;
