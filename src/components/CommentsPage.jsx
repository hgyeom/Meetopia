import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import { db } from '../firebase';
import { styled } from 'styled-components';

// import { collection } from 'firebase/firestore';
// import { addDoc, collection, getDocs, query } from 'firebase';

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
// ----------------------------------styled-component---------------------------

function Comments() {
  // const post = pots.filter((post) => post.id === id)[0];

  const comments = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  const [nickname, setNickname] = useState([
    {
      text: '닉네임 123'
    }
  ]);
  const [comment, setComment] = useState([
    {
      text: '내용 1'
    }
  ]);

  // const addComment = async (event) => {
  //   event.preventDefault();
  //   const newComment = { text: text };
  //   setComments((prev) => {
  //     return [...comments, newComment];
  //   });
  //   StyleSheetContext('');

  //   const collectionRef = collection(db, 'comments');
  //   await addDoc(collectionRef, newComment);
  // };

  // const [text, setText] = useState('');

  return (
    <div>
      <div>
        <h3>댓글</h3>
        <StF
          onSubmit={(event) => {
            event.preventDefault();
            dispatch({
              type: 'ADD_COMMENT',
              payload: {
                nickname: nickname,
                comment: comment,
                id: shortid.generate(),
                postId: '1'
              }
            });
          }}
        >
          <input
            name="닉네임"
            value={nickname}
            onChange={(event) => {
              setNickname(event.target.value);
            }}
          />
          <br />
          <input
            name="내용"
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
          <br />
          <AddBtn type="submit">등록</AddBtn>
        </StF>
      </div>

      <div>
        {comments
          .sort((a, b) => b - a)
          .map((comment) => {
            return (
              <CommentBox key={comment?.id}>
                <p>닉네임 : {comment.nickname}</p>
                <p>내용 : {comment.comment}</p>
                <DeletedBtn
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch({
                      type: 'DELETE_COMMENT',
                      payload: comment.id
                    });
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
