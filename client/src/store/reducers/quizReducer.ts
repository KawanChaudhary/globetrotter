import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizItem } from '../../types';

interface QuizState {
  quiz: QuizItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  quiz: null,
  loading: false,
  error: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    getRandomQuizRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getRandomQuizSuccess(state, action: PayloadAction<QuizItem>) {
      state.loading = false;
      state.quiz = action.payload;
    },
    getRandomQuizFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getRandomQuizRequest, getRandomQuizSuccess, getRandomQuizFailure } = quizSlice.actions;

export default quizSlice.reducer;