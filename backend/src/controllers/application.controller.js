const asyncHandler = require('../utils/asyncHandler');
const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Jobseeker only)
const applyJob = asyncHandler(async (req, res) => {
  const { jobId } = req.body;

  // Check if job exists
  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  // Check if already applied
  const existingApplication = await Application.findOne({
    job: jobId,
    applicant: req.user._id,
  });

  if (existingApplication) {
    return res.status(409).json({ message: 'Already applied to this job' });
  }

  const application = await Application.create({
    job: jobId,
    applicant: req.user._id,
  });

  res.status(201).json(application);
});

// @desc    Get my applications
// @route   GET /api/applications/my-applications
// @access  Private (Jobseeker only)
const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ applicant: req.user._id })
    .populate('job', 'title description salary location jobType')
    .populate('job.employer', 'name email');

  res.json(applications);
});

module.exports = {
  applyJob,
  getMyApplications,
};