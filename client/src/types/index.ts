export interface User {
  id: string;
  email: string;
  username: string;
  numberOfAttempts: number;
  highestScore: number;
  attempts: {
    date: string;
    numberOfQuestions: number;
    correct: number;
    incorrect: number;
    unattempted: number;
    score: number;
  }[];
}