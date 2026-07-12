import axiosInstance from './axios';

export const usersAPI = {
  getProfile: () => axiosInstance.get('/users/profile'),
  updateProfile: (userData) => axiosInstance.put('/users/profile', userData),
};
