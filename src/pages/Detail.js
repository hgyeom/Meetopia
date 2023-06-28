import React from 'react';
import { Link } from 'react-router-dom';

function Detail() {
  return (
    <div
      style={{
        margin: '30px'
      }}
    >
      <h2>게시글 view page</h2>
      <content>
        <div>
          <label>제목: </label>
          {/* 제목 받아오기 */}
          <label>작성자명:</label>
          {/* 작성자이름 받아오기 */}
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

export default Detail;
