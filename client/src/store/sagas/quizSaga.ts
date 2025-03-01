import { call, put, takeLatest } from 'redux-saga/effects';
import { getRandomQuizRequest, getRandomQuizSuccess, getRandomQuizFailure } from '../reducers/quizReducer';
import { getRandomQuiz } from '../../endpoints';

function* handleGetRandomQuiz() {
  try {
    const response = yield call(getRandomQuiz);
    yield put(getRandomQuizSuccess(response));
  } catch (error) {
    yield put(getRandomQuizFailure(error.message));
  }
}

export default function* quizSaga() {
  yield takeLatest(getRandomQuizRequest.type, handleGetRandomQuiz);
}