import api from '../services/api';

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const register = async (username: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { username, email, password });
  return response.data;
};

export const checkUsername = async (username: string) => {
  const response = await api.get(`/auth/check-username/${username}`);
  return response.data.isAvailable;
};

export const fetchQuizItems = async () => {
  const response = await api.get('/quiz');
  return response.data;
};

export const fetchClue = async (id: string) => {
  const response = await api.get(`/quiz/${id}/clue`);
  return response.data;
};

export const checkAnswers = async (answers: any) => {
  const response = await api.post('/quiz/check-answers', { answers });
  return response.data;
};