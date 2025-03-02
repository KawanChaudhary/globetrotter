import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  activeQuiz: Record<string, any> | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  activeQuiz: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
      state.activeQuiz = action.payload.activeQuiz ?? null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    registerRequest(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    checkUsernameRequest(state) {
      // state.loading = true;
      state.error = null;
    },
    checkUsernameSuccess(state) {
      state.loading = false;
    },
    checkUsernameFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest(state) {
      state.loading = true;
      state.error = null;
      state.user = null;
      state.activeQuiz = null;
    },
    logoutSuccess(state) {
      state.user = null;
      state.loading = false;
      state.activeQuiz = null;
    },
    fetchUserRequest: (state) => {
      state.loading = true;
      state.activeQuiz = null;
    },
    fetchUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.activeQuiz = action.payload.activeQuiz ?? null;
    },
    fetchUserFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  checkUsernameRequest,
  checkUsernameSuccess,
  checkUsernameFailure,
  logoutSuccess,
  logoutRequest,
  fetchUserRequest,
  fetchUserFailure,
  fetchUserSuccess
} = authSlice.actions;

export default authSlice.reducer;