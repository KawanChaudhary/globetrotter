import { call, put, takeLatest, debounce } from 'redux-saga/effects';
import { login, register, checkUsername, getUserDetails, logout } from '../../endpoints';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  checkUsernameRequest,
  checkUsernameSuccess,
  checkUsernameFailure,
  fetchUserRequest, fetchUserSuccess, fetchUserFailure,
  logoutRequest, logoutSuccess
} from '../reducers/authReducer';
import { userResponse } from '@/types';

function* handleLogin(action: ReturnType<typeof loginRequest> & { payload: { username: string, password: string } }) {
  try {
    if (!action.payload) {
      throw new Error('Payload is undefined');
    }
    const response: userResponse = yield call(login, action.payload.username, action.payload.password);
    yield put(loginSuccess(response.user));
  } catch (error) {
    yield put(loginFailure(error.response.data.message));
  }
}

function* handleRegister(action: ReturnType<typeof registerRequest>) {
  try {
    const response: userResponse = yield call(register, action.payload.username, action.payload.email, action.payload.password);
    yield put(registerSuccess(response.user));
  } catch (error) {
    yield put(registerFailure(error.response.data.message));
  }
}

function* handleCheckUsername(action: ReturnType<typeof checkUsernameRequest>) {
  try {
    const response: boolean = yield call(checkUsername, action.payload);
    yield put(checkUsernameSuccess(response));
  } catch (error) {
    yield put(checkUsernameFailure(error.response.data.message));
  }
}

function* fetchUserSaga() {
  try {
    const response = yield call(getUserDetails);
    yield put(fetchUserSuccess(response));
  } catch (error) {
    yield put(fetchUserFailure(error.response.data.message));
  }
}

function* handleLogout() {
  try {
    yield call(logout);
    yield put(logoutSuccess());
  } catch (error) {
    console.log(error);
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
  yield debounce(500, checkUsernameRequest.type, handleCheckUsername);
  yield takeLatest(logoutRequest.type, handleLogout);
  yield takeLatest(fetchUserRequest.type, fetchUserSaga);
}