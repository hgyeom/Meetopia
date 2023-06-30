import { createStore } from 'redux';
import { combineReducers } from 'redux';
import users from '../modules/users';
import comments from '../modules/comments';
import posts from '../modules/posts';
import category from '../modules/category';
import location from '../modules/location';

const rootReducer = combineReducers({
  users,
  comments,
  posts,
  category,
  location
});
const store = createStore(rootReducer);

export default store;
