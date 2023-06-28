import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import { db } from '../firebase';
// import { collection } from 'firebase/firestore';
// import { addDoc, collection, getDocs, query } from 'firebase';

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
        <form
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
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
          <button
            style={{
              borderRadius: '10px',
              color: 'white',
              backgroundColor: '#141414',
              fontSize: '20px'
            }}
            type="submit"
          >
            등록
          </button>
        </form>
      </div>

      <div>
        {comments
          .sort((a, b) => b - a)
          .map((comment) => {
            return (
              <div
                style={{
                  borderBottom: '1px solid black'
                }}
                key={comment?.id}
              >
                <p>닉네임 : {comment.nickname}</p>
                <p>내용 : {comment.comment}</p>
                <button
                  style={{
                    backgroundColor: 'white',
                    border: 'none'
                  }}
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch({
                      type: 'DELETE_COMMENT',
                      payload: comment.id
                    });
                  }}
                >
                  삭제
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Comments;
