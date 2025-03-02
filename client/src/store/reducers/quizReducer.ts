import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizItem } from '../../types';

interface QuizState {
  quiz: QuizItem | null;
  loading: boolean;
  error: string | null;
  clueUsed: boolean;
  submitted:boolean;
  chosedAnswer:string | null;
  currentScore: number;
  isCorrect:boolean;
}

const initialState: QuizState = {
  quiz: null,
  submitted:false,
  loading: false,
  error: null,
  clueUsed: false,
  chosedAnswer: null,
  currentScore: 0,
  isCorrect:false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    getRandomQuizRequest(state) {
      state.loading = true;
      state.error = null;
      state.submitted = false;
      state.clueUsed = false;
      state.chosedAnswer = null;
      state.isCorrect = false;
    },
    getRandomQuizSuccess(state, action) {
      state.loading = false;
      state.quiz = action.payload.quiz;
      state.currentScore = action.payload.currentScore;
    },
    getRandomQuizFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getClueRequest(state) {
      state.error = null;
      state.clueUsed = true;
    },
    getClueSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      if (state.quiz) {
        state.quiz.clue = action.payload;
      }
    },
    getClueFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    checkAnswerRequest(state, action) {
      state.error = null;
      state.submitted = true;
      state.chosedAnswer = action.payload.answer;
    },
    checkAnswerSuccess(state, action) {
      state.loading = false;
      state.quiz = action.payload.quiz;
      state.currentScore = action.payload.currentScore;
      state.isCorrect = action.payload.quiz.correctAnswer === state.chosedAnswer;
    },
    checkAnswerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getRandomQuizRequest,
  getRandomQuizSuccess,
  getRandomQuizFailure,
  getClueRequest,
  getClueSuccess,
  getClueFailure,
  checkAnswerRequest,
  checkAnswerSuccess,
  checkAnswerFailure,
} = quizSlice.actions;

export default quizSlice.reducer;