import { createAction } from '@reduxjs/toolkit';
import { User } from '../../types';

export const loginRequest = createAction<{ username: string; password: string }>('auth/loginRequest');
export const loginSuccess = createAction<{ user: User; token: string }>('auth/loginSuccess');
export const loginFailure = createAction<string>('auth/loginFailure');

export const registerRequest = createAction<{ username: string; email: string; password: string }>('auth/registerRequest');
export const registerSuccess = createAction<{ user: User; token: string }>('auth/registerSuccess');
export const registerFailure = createAction<string>('auth/registerFailure');

export const checkUsernameRequest = createAction<string>('auth/checkUsernameRequest');
export const checkUsernameSuccess = createAction<boolean>('auth/checkUsernameSuccess');
export const checkUsernameFailure = createAction<string>('auth/checkUsernameFailure');

export const logoutRequest = createAction('auth/logoutRequest');
export const logoutSuccess = createAction('auth/logoutSuccess');