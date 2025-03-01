import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getRandomQuizRequest,
  getRandomQuizSuccess,
  getRandomQuizFailure,
  getClueRequest,
  getClueSuccess,
  getClueFailure,
  checkAnswerRequest,
  checkAnswerSuccess,
  checkAnswerFailure,
} from '../actions/quizActions';
import { getRandomQuiz, fetchClue, updateScore } from '../../endpoints';

function* handleGetRandomQuiz() {
  try {
    const response = yield call(getRandomQuiz);
    yield put(getRandomQuizSuccess(response));
  } catch (error) {
    yield put(getRandomQuizFailure(error.message));
  }
}

function* handleGetClue(action: ReturnType<typeof getClue>) {
  try {
    const response = yield call(fetchClue, action.payload);
    yield put(getClueSuccess(response.clue));
  } catch (error) {
    yield put(getClueFailure(error.message));
  }
}

function* handleCheckAnswer(action: ReturnType<typeof checkAnswer>) {
  try {
    const response = yield call(updateScore, action.payload);
    console.log(response);
    yield put(checkAnswerSuccess(response));
  } catch (error) {
    yield put(checkAnswerFailure(error.message));
  }
}

export default function* quizSaga() {
  yield takeLatest(getRandomQuizRequest.type, handleGetRandomQuiz);
  yield takeLatest(getClueRequest.type, handleGetClue);
  yield takeLatest(checkAnswerRequest.type, handleCheckAnswer);
}