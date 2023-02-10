import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postReducer from '../features/post/postSlice';
import usersReducer from '../features/users/usersSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    posts: postReducer,
    users: usersReducer
  },
});
