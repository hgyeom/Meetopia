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

  // -------------------------------------useState관리---------------------------------------

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

    if (!userid) {
      alert('로그인 후 사용해주세요');
      return;
    }

    const newComment = { comment, nickname, postId, userid, days: new Date().toLocaleString() };

    const collectionRef = collection(db, 'comment');
    await addDoc(collectionRef, newComment);
    setIsAdd(!isAdd);
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
        <MainLabel>댓글</MainLabel>
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
      <div style={{}}>
        {comments.map((comment) => {
          return (
            <CommentBox key={comment?.commentsId}>
              <p>
                <Label>닉네임 : </Label>
                {comment.nickname}
              </p>

              <p>
                <Label>내용 : </Label>
                {comment.comment}
              </p>
              {comment.userid === userid && (
                <DeletedBtn
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  댓글삭제
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
  margin-left: 15px;
`;

const CommentBox = styled.div`
  border-bottom: 2px solid #dedede;
  padding: 10px;
  margin: 10px;
`;

const DeletedBtn = styled.button`
  /* background-color: white;
  border: none; */
  /* 지영님 이건 어떤가요 */
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const MainLabel = styled.label`
  margin-left: 17px;
  font-size: 22px;
  font-weight: 600;
`;

const Label = styled.span`
  font-weight: 600;
`;

// ----------------------------------styled-component---------------------------------------...
