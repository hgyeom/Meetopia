import React from 'react';

function DetailEdit() {
  return (
    <div
      style={{
        margin: '30px'
      }}
    >
      <h2>게시글 작성/수정 page</h2>
      <content>
        <div>
          <label>제목: </label>
          <input />
          <label>작성자명:</label>
          <input />
        </div>
        <div>
          주제별:
          <select>
            <option value="sports">스포츠</option>
            <option value="study">스터디</option>
            <option value="pet">반려동물</option>
            <option value="dance">댄스</option>
          </select>
          지역별:
          <select>
            <option value="sports">서울</option>
            <option value="study">인천</option>
            <option value="pet">경기</option>
          </select>
        </div>
        <form>
          <label>모임을 소개해주세요!</label>
          <div>
            <textarea rows="30" cols="80"></textarea>
          </div>
          <button>작성 완료</button>
        </form>
      </content>
    </div>
  );
}

export default DetailEdit;
