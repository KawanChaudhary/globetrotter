import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchQuizItems, checkAnswers } from '../../endpoints';
import {
  fetchQuizItemsRequest,
  fetchQuizItemsSuccess,
  fetchQuizItemsFailure,
  checkAnswersRequest,
  checkAnswersSuccess,
  checkAnswersFailure,
} from '../reducers/quizReducer';
import { QuizItem, CheckAnswersResponse } from '../../endpoints/types';

function* handleFetchQuizItems() {
  try {
    const response: QuizItem[] = yield call(fetchQuizItems);
    yield put(fetchQuizItemsSuccess(response));
  } catch (error) {
    yield put(fetchQuizItemsFailure(error.message));
  }
}

function* handleCheckAnswers(action: ReturnType<typeof checkAnswersRequest>) {
  try {
    const response: CheckAnswersResponse = yield call(checkAnswers, action.payload.answers);
    yield put(checkAnswersSuccess(response));
  } catch (error) {
    yield put(checkAnswersFailure(error.message));
  }
}

export default function* quizSaga() {
  yield takeLatest(fetchQuizItemsRequest.type, handleFetchQuizItems);
  yield takeLatest(checkAnswersRequest.type, handleCheckAnswers);
}