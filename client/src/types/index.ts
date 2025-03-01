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

export interface userResponse {
  messsage: string;
  ok: boolean;
  user: User;
}

export interface QuizItem {
  id: string;
  trivia: string;
  options: string[];
  funFact: string;
}

export interface ClueResponse {
  clue: string;
}

export interface CheckAnswersResponse {
  score: number;
  results: {
    id: string;
    trivia: string;
    options: string[];
    funFact: string;
    userAnswer: string;
    usedClue: boolean;
    correctAnswer: string;
    correct: boolean;
  }[];
}
