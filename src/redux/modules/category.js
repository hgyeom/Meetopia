const CHANGE_CATEGORY = 'CHANGE_CATEGORY';

export const changeCategory = (payload) => {
  return {
    type: CHANGE_CATEGORY,
    payload
  };
};

const initialState = '모두보기';

const category = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};

export default category;
