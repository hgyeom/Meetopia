// Action Value
const ADD_CURRENT_USER = 'todos/ADD_CURRENT_USER';
const UPDATE_CURRENT_USER = 'todos/UPDATE_CURRENT_USER';

// Action Creator
export const addCurrentUser = (payload) => {
  return {
    type: ADD_CURRENT_USER,
    payload
  };
};
export const updateCurrentUser = (payload) => {
  console.log('들어왔나?', payload);
  return {
    type: UPDATE_CURRENT_USER,
    payload
  };
};

// Initial State
const initialState = {
  users: [
    {
      userid: 'aaa@aaa.com',
      nickname: '닉네임',
      password: '12341234',
      profileImg: '없'
    }
  ],
  currentUser: {
    userid: null,
    email: null,
    nickname: null,
    profileImg:
      'https://img.freepik.com/free-psd/3d-illustration-of-person-with-sunglasses_23-2149436188.jpg?t=st=1687916349~exp=1687916949~hmac=2218e9a85f4ca6ec7bffaa2f039880cd65ad7ff557e227dfd1002fc180b846cb'
  }
};

// Reducer
const users = (state = initialState, action) => {
  switch (action.type) {
    case updateCurrentUser:
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload }
      };
    case ADD_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

// export default reducer
export default users;
