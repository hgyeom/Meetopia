// import { collection, getDocs, query } from 'firebase/firestore';
// import { db } from '../../firebase';

const initialState = [];

const contents = (state = initialState, action) => {
  switch (action.type) {
    case 'READ_ALL_POSTS':
      return state;
    default:
      return state;
  }
};

export default contents;
