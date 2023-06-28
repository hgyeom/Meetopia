const initialState = [
  {
    commentsId: '1234@1234',
    nicknames: '랜덤 닉네임',
    comments: '내용'
  },
  {
    commentsId: '1234@1234',
    nicknames: '랜덤 닉네임',
    comments: '내용'
  },
  {
    commentsId: '1234@1234',
    nicknames: '랜덤 닉네임',
    comments: '내용'
  }
];

const comments = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [...state, action.payload];
    case 'DELETE_COMMENT':
      return state.filter((comment) => comment.id !== action.payload);
    default:
      return state;
  }
};

export default comments;
