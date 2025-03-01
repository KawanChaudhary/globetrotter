import { createAction } from '@reduxjs/toolkit';
import { QuizItem } from '../../types';

export const getRandomQuizRequest = createAction('quiz/getRandomQuizRequest');
export const getRandomQuizSuccess = createAction<QuizItem>('quiz/getRandomQuizSuccess');
export const getRandomQuizFailure = createAction<string>('quiz/getRandomQuizFailure');

export const getClueRequest = createAction<string>('quiz/getClueRequest');
export const getClueSuccess = createAction<string>('quiz/getClueSuccess');
export const getClueFailure = createAction<string>('quiz/getClueFailure');

export const checkAnswerRequest = createAction<{ id: string; answer: string }>('quiz/checkAnswerRequest');
export const checkAnswerSuccess = createAction<boolean>('quiz/checkAnswerSuccess');
export const checkAnswerFailure = createAction<string>('quiz/checkAnswerFailure');