// import { collection, getDocs, query } from 'firebase/firestore';
// import { db } from '../../firebase';
const INITIAL_DATA = 'INITIAL_DATA';
const FILTERD_POSTS = 'FILTERD_POSTS';

export const initialData = (payload) => {
  return {
    type: INITIAL_DATA,
    payload
  };
};

export const filterdPosts = (payload) => {
  return {
    type: FILTERD_POSTS,
    payload
  };
};

const initialState = [];

const contents = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_DATA:
      return action.payload;
    case FILTERD_POSTS:
      const { category, allPosts, location } = action.payload;
      return category !== '모두보기'
        ? location !== '모두보기'
          ? allPosts.filter((item) => item.category === category).filter((item) => item.location === location)
          : allPosts.filter((item) => item.category === category)
        : location !== '모두보기'
        ? allPosts.filter((item) => item.location === location)
        : allPosts;
    default:
      return state;
  }
};

export default contents;
