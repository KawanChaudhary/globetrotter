import api from '../services/api';

export const login = async (username: string, password: string) => {
  const response = await api.post('/users/login', { username, password });
  return response.data;
};

export const register = async (username: string, email: string, password: string) => {
  const response = await api.post('/users/register', { username, email, password });
  return response.data;
};

export const getUserDetails = async () => {
  const response = await api.get('/users/me', { withCredentials: true });
  return response.data;
}

export const checkUsername = async (username: string) => {
  const response = await api.get(`/users/check-username/${username}`);
  return response.data.isAvailable;
};

export const fetchQuizItems = async () => {
  const response = await api.get('/quiz', { withCredentials: true });
  return response.data;
};

export const fetchClue = async (id: string) => {
  const response = await api.get(`/quiz/${id}/clue`, { withCredentials: true });
  return response.data;
};

export const checkAnswers = async (answers: any) => {
  const response = await api.post('/quiz/check-answers', { withCredentials: true, answers });
  return response.data;
};