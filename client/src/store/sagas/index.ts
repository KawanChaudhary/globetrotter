import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import quizSaga from './quizSaga';

export default function* rootSaga() {
  yield all([authSaga(), quizSaga()]);
}