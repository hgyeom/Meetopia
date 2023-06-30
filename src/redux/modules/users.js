// Action Value
const ADD_CURRENT_USER = 'todos/ADD_CURRENT_USER';
const UPDATE_CURRENT_USER = 'todos/UPDATE_CURRENT_USER';

// Action Creator
export const addCurrentUser = (currentUser, isLogin) => {
  return {
    type: ADD_CURRENT_USER,
    currentUser,
    isLogin
  };
};

export const updateCurrentUser = (payload) => {
  return {
    type: UPDATE_CURRENT_USER,
    payload
  };
};

// Initial State
const initialState = {
  currentUser: {
    userid: null,
    email: null,
    nickname: null,
    profileImg:
      'https://firebasestorage.googleapis.com/v0/b/meetopia-5eb69.appspot.com/o/profile.png?alt=media&token=99a0a3e3-6ebf-4eba-a600-f1fce3405617 '
  },
  isLogin: false
};

// Reducer
const users = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload }
      };
    case ADD_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
        isLogin: action.isLogin
      };
    default:
      return state;
  }
};

// export default reducer
export default users;
