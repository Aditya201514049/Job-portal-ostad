import axiosInstance from './axios';

export const applicationsAPI = {
  applyJob: (jobId) => axiosInstance.post('/applications', { jobId }),
  getMyApplications: () => axiosInstance.get('/applications/my-applications'),
};
