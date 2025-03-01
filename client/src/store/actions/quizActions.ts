import { createAction } from '@reduxjs/toolkit';
import { QuizItem } from '../../types';

export const getRandomQuizRequest = createAction('quiz/getRandomQuizRequest');
export const getRandomQuizSuccess = createAction<QuizItem>('quiz/getRandomQuizSuccess');
export const getRandomQuizFailure = createAction<string>('quiz/getRandomQuizFailure');