import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import quizReducer from './quizReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;