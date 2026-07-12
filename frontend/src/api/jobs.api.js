import axiosInstance from './axios';

export const jobsAPI = {
  getAllJobs: () => axiosInstance.get('/jobs'),
  getJobById: (id) => axiosInstance.get(`/jobs/${id}`),
  createJob: (jobData) => axiosInstance.post('/jobs', jobData),
  updateJob: (id, jobData) => axiosInstance.put(`/jobs/${id}`, jobData),
  deleteJob: (id) => axiosInstance.delete(`/jobs/${id}`),
  getMyJobs: () => axiosInstance.get('/jobs/my-posts'),
};
