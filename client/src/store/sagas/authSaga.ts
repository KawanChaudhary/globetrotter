import { call, put, takeLatest, debounce } from 'redux-saga/effects';
import { login, register, checkUsername } from '../../endpoints';
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
} from '../reducers/authReducer';
import { LoginResponse, RegisterResponse } from '../../endpoints/types';

function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const response: LoginResponse = yield call(login, action.payload.username, action.payload.password);
    yield put(loginSuccess({ user: response.user, token: response.token }));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* handleRegister(action: ReturnType<typeof registerRequest>) {
  try {
    const response: RegisterResponse = yield call(register, action.payload.username, action.payload.email, action.payload.password);
    yield put(registerSuccess({ user: response.user, token: response.token }));
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

function* handleCheckUsername(action: ReturnType<typeof checkUsernameRequest>) {
  try {
    const response: boolean = yield call(checkUsername, action.payload);
    yield put(checkUsernameSuccess(response));
  } catch (error) {
    yield put(checkUsernameFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
  yield debounce(500, checkUsernameRequest.type, handleCheckUsername);
}