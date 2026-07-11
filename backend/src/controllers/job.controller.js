const asyncHandler = require('../utils/asyncHandler');
const jobService = require('../services/job.service');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await jobService.getAllJobs();
  res.json(jobs);
});

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = asyncHandler(async (req, res) => {
  const job = await jobService.getJobById(req.params.id);
  res.json(job);
});

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Employer only)
const createJob = asyncHandler(async (req, res) => {
  const job = await jobService.createJob(req.body, req.user._id);
  res.status(201).json(job);
});

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Employer only, own jobs)
const updateJob = asyncHandler(async (req, res) => {
  const job = await jobService.updateJob(req.params.id, req.body, req.user._id);
  res.json(job);
});

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Employer only, own jobs)
const deleteJob = asyncHandler(async (req, res) => {
  const result = await jobService.deleteJob(req.params.id, req.user._id);
  res.json(result);
});

// @desc    Get my posted jobs
// @route   GET /api/jobs/my-posts
// @access  Private (Employer only)
const getMyJobs = asyncHandler(async (req, res) => {
  const jobs = await jobService.getMyJobs(req.user._id);
  res.json(jobs);
});

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
};