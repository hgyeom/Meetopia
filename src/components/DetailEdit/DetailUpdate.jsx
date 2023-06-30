import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { styled } from 'styled-components';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
    <>
      <div style={{ margin: '30px', maxWidth: '1300px' }}>
        <MainTitle>[모임 만들기 글 수정]</MainTitle>
        <content>
          <form onSubmit={updatePost}>
            <ContentBox>
              <label>제목: </label>
              <input type="text" name="title" value={title} onChange={onChange} />
              <label>작성자명:{nickname}</label>
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
              <button>수정 완료</button>
              <Link to={`/detail/${postId}`}>
                <button>취소</button>
              </Link>
            </ContentBox>
          </form>
        </content>
      </div>
    </>
  );
}

export default DetailUpdate;
const MainTitle = styled.h2`
  font-size: larger;
  font-weight: 600;
  margin: 10px;
`;

const SubTitle = styled.h2`
  font-size: small;
  font-weight: 600;
  margin: 10px;
`;

const ContentBox = styled.div`
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
`;
