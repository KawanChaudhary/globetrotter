export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface RegisterResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
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