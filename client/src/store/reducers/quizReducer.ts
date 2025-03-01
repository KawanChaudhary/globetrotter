import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizItem, CheckAnswersResponse } from '../../endpoints/types';

interface QuizState {
  items: QuizItem[];
  loading: boolean;
  error: string | null;
  results: CheckAnswersResponse | null;
}

const initialState: QuizState = {
  items: [],
  loading: false,
  error: null,
  results: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    fetchQuizItemsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchQuizItemsSuccess(state, action: PayloadAction<QuizItem[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchQuizItemsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    checkAnswersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    checkAnswersSuccess(state, action: PayloadAction<CheckAnswersResponse>) {
      state.results = action.payload;
      state.loading = false;
    },
    checkAnswersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchQuizItemsRequest,
  fetchQuizItemsSuccess,
  fetchQuizItemsFailure,
  checkAnswersRequest,
  checkAnswersSuccess,
  checkAnswersFailure,
} = quizSlice.actions;

export default quizSlice.reducer;