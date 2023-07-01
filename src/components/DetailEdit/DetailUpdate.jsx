import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import * as S from './DetailPost.styled';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, ButtonGray, Input, Select, Textarea } from '../Common.styled';

function DetailUpdate() {
  const { nickname } = useSelector((state) => {
    return state.users.currentUser;
  });

  const [post, setPost] = useState();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [selectTopic, setSelectTopic] = useState('');
  const [selectLocation, setSelectLocation] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  //postId 값 가져오기
  const postId = location.state?.postId;

  //fireStore 'post' 데이터 읽어오기(postId랑 일치한 애만)
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'posts'));
      const querySnapshot = await getDocs(q);

      let initialPost;
      querySnapshot.forEach((doc) => {
        if (doc.id === postId) {
          initialPost = { id: doc.id, ...doc.data() };
        }
      });
      setPost(initialPost);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTitle(post?.title);
    setContent(post?.content);
    setSelectTopic(post?.category);
    setSelectLocation(post?.location);
  }, [post]);

  // 주제별 select 박스
  const selectTopicList = [
    { value: '없음', name: '==선택==' },
    { value: '스터디', name: '공부' },
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

  //글 수정하기
  const updatePost = async (e) => {
    e.preventDefault();
    const postRef = doc(db, 'posts', postId);
    if (!title || !content || selectTopic === '' || selectLocation === '') {
      alert('모든 내용을 입력해주세요.(제목, 내용, 카테고리)');
      return false;
    }
    updateDoc(postRef, {
      title: title,
      content: content,
      category: selectTopic,
      location: selectLocation
    });
    navigate(`/detail/${postId}`);
  };

  return (
    <div>
      <S.MainTitle>[모임 만들기 글 수정]</S.MainTitle>
      <content>
        <form onSubmit={updatePost}>
          <S.ContentBox2>
            <label>제목: </label>
            <Input type="text" name="title" value={title} onChange={onChange} />
            <label>작성자명: </label>
            <S.WriterLabel>{nickname}</S.WriterLabel>
          </S.ContentBox2>
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
            <ButtonGray type="button" onClick={() => navigate('/')}>
              취소
            </ButtonGray>
            <Button>수정 완료</Button>
          </S.BtnBox>
        </form>
      </content>
    </div>
  );
}

export default DetailUpdate;
