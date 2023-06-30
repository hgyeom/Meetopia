import { addDoc, collection, getDocs, query, deleteDoc, doc, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import { db } from '../firebase';
import { styled } from 'styled-components';
import { updateDoc } from 'firebase/firestore';

// ----------------------------------styled-component---------------------------
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
// ----------------------------------styled-component------------------------------

// -------------------------------------useState관리--------------------------------
function Comments() {
  // const post = pots.filter((post) => post.id === id)[0];

  const comments = useSelector((state) => state.comments);
  console.log(comments, '핫');
  const dispatch = useDispatch();

  const [isAdd, setIsAdd] = useState(false);

  const [comment, setComment] = useState([]);

  // -------------------------------------useState관리-------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'comment'), orderBy('timeStamp', 'desc'));
      const querySnapshot = await getDocs(q);

      const initialComments = [];

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };
        initialComments.push(data);
      });
      console.log(initialComments);

      setComment(initialComments);

      dispatch({
        type: 'InitialState',
        payload: initialComments
      });
    };

    fetchData();
    // console.log(new Date());
  }, [isAdd]);

  // ----------------------------------------데이터 추가하기----------------------------------
  const addComment = async (event) => {
    event.preventDefault();
    const nickname = 's닉네임';
    const postId = '1';
    const newComment = { comment, nickname, postId, timeStamp: new Date() };
    setComment(() => {
      return [...comments, newComment];
    });
    setComment('');
    // dispatch({
    //   type: 'ADD_COMMENT',
    //   payload: {
    //     nickname: nickname,
    //     comment: comment,
    //     postId: '1',
    //     timeStamp: new Date()
    //   }
    // });

    const collectionRef = collection(db, 'comment');
    await addDoc(collectionRef, newComment);
    setIsAdd(!isAdd);
    // window.location.reload();
    //방법을 모르겠어요.........
  };

  // ----------------------------------------데이터 추가하기----------------------------------

  // ----------------------------------------데이터 삭제하기----------------------------------
  const deleteComment = async (event, test) => {
    console.log('event', event);
    console.log('test', test);
    console.log(event.target.dataset.docid);
    let reviewDocId = event.target.dataset.docid;
    const collectionRef = collection(db, 'comment');
    const commentRef = doc(collectionRef, reviewDocId);

    await deleteDoc(commentRef);

    dispatch({
      type: 'DELETE_COMMENT',
      payload: reviewDocId
    });
    // console.log('id', testId);
  };
  // ----------------------------------------데이터 삭제하기----------------------------------
  console.log('comments', comments);
  return (
    <div>
      <div>
        <h3>댓글</h3>
        <StF
        // onSubmit={(event) => {
        //   event.preventDefault();
        //   dispatch({
        //     type: 'ADD_COMMENT',
        //     payload: {
        //       nickname: nickname,
        //       comment: comment,
        //       id: shortid.generate(),
        //       postId: '1'
        //     }
        //   });
        // }}
        >
          {/* <input
            name="닉네임"
            value={nickname}
            onChange={(event) => {
              setNickname(event.target.value);
            }}
          /> */}
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
          console.log(comment);
          return (
            <CommentBox key={comment?.commentsId}>
              <p>닉네임 : {comment.nickname}</p>
              <p>내용 : {comment.comment}</p>
              <DeletedBtn
                data-docId={comment.id}
                onClick={(event) => {
                  deleteComment(event, comment.id);
                }}
              >
                삭제
              </DeletedBtn>
            </CommentBox>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
