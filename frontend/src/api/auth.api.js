import axiosInstance from './axios';

export const authAPI = {
  register: (userData) => axiosInstance.post('/auth/register', userData),
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  logout: () => axiosInstance.post('/auth/logout'),
};
