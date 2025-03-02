export interface User {
  id: string;
  email: string;
  username: string;
  highestScore: number;
  attempts: {
    date: string;
    numberOfQuestions: number;
    correct: number;
    incorrect: number;
    unattempted: number;
    score: number;
  }[];
  activeQuiz: Record<string, any> | null;
}

export interface userResponse {
  messsage: string;
  ok: boolean;
  user: User;
}

export interface QuizItem {
  id: string;
  correctAnswer?: string;
  trivia?: string;
  options: string[];
  funFact?: string;
  clue?:string
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
