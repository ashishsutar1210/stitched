import { apiRequest } from './api';

const TOKEN_KEY = 'authToken';

export const login = async (credentials) => {
  const data = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { 'Content-Type': 'application/json' }
  });
  localStorage.setItem(TOKEN_KEY, data.token);
  if (data.name) {
    localStorage.setItem('userName', data.name);
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('userName');
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isLoggedIn = () => {
  const token = getToken();
  return !!token;
};

export const getUserName = () => {
  return localStorage.getItem('userName');
};