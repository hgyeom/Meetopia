import { addDoc, collection, getDocs, query, deleteDoc, doc, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { styled } from 'styled-components';

// -------------------------------------useState관리--------------------------------------
function Comments({ postId, nickname, userid }) {
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  const [isAdd, setIsAdd] = useState(false);
  const [comment, setComment] = useState([]);

  // -------------------------------------useState관리-------------------------------------

  const fetchData = async () => {
    const q = query(collection(db, 'comment'), orderBy('days', 'desc'));
    const querySnapshot = await getDocs(q);

    const initialComments = [];

    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        ...doc.data()
      };
      initialComments.push(data);
    });

    dispatch({
      type: 'InitialState',
      payload: { initialComments, postId }
    });
  };

  useEffect(() => {
    fetchData();
  }, [isAdd]);

  // ----------------------------------------데이터 추가하기----------------------------------
  const addComment = async (event) => {
    event.preventDefault();
    const newComment = { comment, nickname, postId, userid, days: new Date().toLocaleString() };

    const collectionRef = collection(db, 'comment');
    await addDoc(collectionRef, newComment);
    setIsAdd(!isAdd);
    // window.location.reload();
    // 댓글을 삭제하였을 떄 Redux stor의 상태를 업데이트하는 동시에 콘솔에도 데이터가 삭제되길 원했는데
    // 새로고침을 하지 않으면 state의 상태 변화만 일어나고 콘솔에는 작동되지 않는 오류가 있어
    // 여러 방법들로 해결해보다 해결하지 못해 강제로 새로고침을 주었습니다

    // - 30일 기준 해결방법을 찾아 해결 후 커밋
  };

  // ----------------------------------------데이터 추가하기----------------------------------

  // ----------------------------------------데이터 삭제하기----------------------------------
  const deleteComment = async (commentId) => {
    const collectionRef = collection(db, 'comment');
    const commentRef = doc(collectionRef, commentId);

    await deleteDoc(commentRef);

    dispatch({
      type: 'DELETE_COMMENT',
      payload: commentId
    });
  };
  // ----------------------------------------데이터 삭제하기----------------------------------

  return (
    <div>
      <div>
        <h3>댓글</h3>
        <StF>
          <br />
          <input
            name="내용"
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
          <br />
          <AddBtn type="submit" onClick={addComment}>
            등록
          </AddBtn>
        </StF>
      </div>
      <div>
        {comments.map((comment) => {
          return (
            <CommentBox key={comment?.commentsId}>
              <p>닉네임 : {comment.nickname}</p>
              <p>내용 : {comment.comment}</p>
              {comment.userid === userid && (
                <DeletedBtn
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  삭제
                </DeletedBtn>
              )}
            </CommentBox>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;

// ----------------------------------styled-component-----------------------------------
const StF = styled.form`
  display: flex;
  justify-content: center;
`;

const AddBtn = styled.button`
  border-radius: 10px;
  color: white;
  background-color: #141414;
  font-size: 20px;
`;

const CommentBox = styled.div`
  border-bottom: 1px solid black;
  padding: 10px;
  margin: 10px;
`;

const DeletedBtn = styled.button`
  background-color: white;
  border: none;
`;
// ----------------------------------styled-component---------------------------------------..
