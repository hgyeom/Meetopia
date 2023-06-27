import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../firebase';
import { styled } from 'styled-components';

function DetailEditPost() {
  const [posts, setPosts] = useState([]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [selectTopic, setSelectTopic] = useState('');
  const [selectLocation, setSelectLocation] = useState('');

  // 주제별 select 박스
  const selectTopicList = [
    { value: 'none', name: '==선택==' },
    { value: 'study', name: '스터디' },
    { value: 'sports', name: '스포츠' },
    { value: 'pet', name: '반려동물' },
    { value: 'etc', name: '그 외' }
  ];

  // 지역별 select 박스
  const selectLocationList = [
    { value: 'none', name: '==선택==' },
    { value: 'seoul', name: '서울' },
    { value: 'gyeonggi', name: '경기' },
    { value: 'incheon', name: '인천' }
  ];

  //주제별 select 박스 값
  const handleSelectTopic = (event) => {
    setSelectTopic(event.target.value);
    // console.log(selectTopic);
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
      title: title,
      content: content,
      category: selectTopic,
      location: selectLocation,
      days: today.toLocaleString()
    };
    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
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
    await addDoc(collectionRef, newPost);
  };

  // console.log(posts);

  return (
    <div
      style={{
        margin: '30px'
      }}
    >
      <MainTitle>게시글 작성/수정 page</MainTitle>
      <br />
      <content>
        <form onSubmit={addPost}>
          <ContentBox>
            <label>제목: </label>
            <input type="text" name="title" value={title} onChange={onChange} />
            <label>작성자명:</label>
            <input />
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
          <ContentBox>
            <label>모임을 소개해주세요!</label>
            <div>
              <textarea rows="30" cols="80" type="text" name="content" value={content} onChange={onChange}></textarea>
            </div>
            <button>작성 완료</button>
          </ContentBox>
        </form>
      </content>
    </div>
  );
}

export default DetailEditPost;

const MainTitle = styled.h2`
  font-size: larger;
  font-weight: 600;
`;

const ContentBox = styled.div`
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
`;
