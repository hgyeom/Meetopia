import { addDoc, collection, getDocs, query, deleteDoc, doc, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import * as S from './CommentsPage.styled';
import { Input } from './Common.styled';

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
    if (!comment.length) {
      alert('댓글을 입력해주세요.');
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
        <S.MainLabel>댓글</S.MainLabel>
        <S.StF>
          <br />
          <Input
            name="내용"
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
          <br />
          <S.AddBtn type="submit" onClick={addComment}>
            등록
          </S.AddBtn>
        </S.StF>
      </div>
      <div>
        {comments.map((comment) => {
          return (
            <S.CommentBox key={comment?.commentsId}>
              <p>
                <S.Label>닉네임 : </S.Label>
                {comment.nickname}
              </p>

              <p>
                <S.Label>내용 : </S.Label>
                {comment.comment}
              </p>
              {comment.userid === userid && (
                <S.DeletedBtn
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  댓글삭제
                </S.DeletedBtn>
              )}
            </S.CommentBox>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
