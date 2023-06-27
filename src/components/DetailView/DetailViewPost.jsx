import React from 'react';
import { Link, useParams } from 'react-router-dom';

function DetailViewPost() {
  const { id } = useParams();
  //firebase에 있는 posts 접근 / detail view 에서 뿌려줘야해서 거기로 넣어하나..
  // useEffect(() => {
  //   // addDoc(collection(db, 'posts'), { contents: '데이터 저장 테스트' });
  //   const fetchData = async () => {
  //     const q = query(collection(db, 'posts'));
  //     const querySnapshot = await getDocs(q);

  //     const initialPosts = [];
  //     querySnapshot.forEach((doc) => {
  //       initialPosts.push({ id: doc.id, ...doc.data() });
  //     });
  //     setPosts(initialPosts);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div
      style={{
        margin: '30px'
      }}
    >
      <h2>게시글 view page</h2>
      <content>
        <div>
          <h2>제목</h2>
          <label>작성자명:</label>
          {/* 작성자이름 받아오기 */}
          <label>작성일:</label>
          {/* 작성날짜 받아오기 */}
          <button>
            <Link to="/detail">수정</Link>
          </button>
        </div>
        <div>
          주제별:
          {/* 주제 받아오기 */}
          지역별:
          {/* 지역 받아오기 */}
        </div>
        <form>
          <label>모임을 소개해주세요!</label>
          <div
            style={{
              border: '1px solid black',
              width: '100%'
            }}
          >
            모임소개글~~
            {/* 소개글 불러오기 */}
          </div>
        </form>
      </content>
    </div>
  );
}

export default DetailViewPost;
