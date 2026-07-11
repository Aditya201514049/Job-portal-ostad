const Application = require('../models/Application');
const Job = require('../models/Job');

class ApplicationService {
  async applyJob(jobId, applicantId) {
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      throw new Error('Job not found');
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: applicantId,
    });

    if (existingApplication) {
      throw new Error('Already applied to this job');
    }

    const application = await Application.create({
      job: jobId,
      applicant: applicantId,
    });

    return application;
  }

  async getMyApplications(applicantId) {
    const applications = await Application.find({ applicant: applicantId })
      .populate('job', 'title description salary location jobType')
      .populate('job.employer', 'name email');

    return applications;
  }
}

module.exports = new ApplicationService();
