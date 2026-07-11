const Job = require('../models/Job');

class JobService {
  async getAllJobs() {
    const jobs = await Job.find().populate('employer', 'name email');
    return jobs;
  }

  async getJobById(jobId) {
    const job = await Job.findById(jobId).populate('employer', 'name email');
    
    if (!job) {
      throw new Error('Job not found');
    }
    
    return job;
  }

  async createJob(jobData, employerId) {
    const { title, description, requirements, salary, location, jobType } = jobData;

    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      employer: employerId,
    });

    return job;
  }

  async updateJob(jobId, updateData, userId) {
    const job = await Job.findById(jobId);

    if (!job) {
      throw new Error('Job not found');
    }

    if (job.employer.toString() !== userId.toString()) {
      throw new Error('Not authorized to update this job');
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, {
      new: true,
      runValidators: true,
    });

    return updatedJob;
  }

  async deleteJob(jobId, userId) {
    const job = await Job.findById(jobId);

    if (!job) {
      throw new Error('Job not found');
    }

    if (job.employer.toString() !== userId.toString()) {
      throw new Error('Not authorized to delete this job');
    }

    await Job.findByIdAndDelete(jobId);
    return { message: 'Job removed' };
  }

  async getMyJobs(userId) {
    const jobs = await Job.find({ employer: userId });
    return jobs;
  }
}

module.exports = new JobService();
