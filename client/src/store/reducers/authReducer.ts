import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
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
      state.loading = true;
      state.error = null;
    },
    checkUsernameSuccess(state) {
      state.loading = false;
    },
    checkUsernameFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
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
  logout,
} = authSlice.actions;

export default authSlice.reducer;