const comments = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [...state, action.payload];
    case 'DELETE_COMMENT':
      return state.filter((comment) => comment.id !== action.payload);
    case 'InitialState':
      const { initialComments, postId } = action.payload;

      return initialComments.filter((comment) => comment.postId === postId);
    default:
      return state;
  }
};

export default comments;
