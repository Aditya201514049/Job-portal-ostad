const asyncHandler = require('../utils/asyncHandler');
const applicationService = require('../services/application.service');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Jobseeker only)
const applyJob = asyncHandler(async (req, res) => {
  const { jobId } = req.body;
  const application = await applicationService.applyJob(jobId, req.user._id);
  res.status(201).json(application);
});

// @desc    Get my applications
// @route   GET /api/applications/my-applications
// @access  Private (Jobseeker only)
const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await applicationService.getMyApplications(req.user._id);
  res.json(applications);
});

module.exports = {
  applyJob,
  getMyApplications,
};