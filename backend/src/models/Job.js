const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a job description'],
  },
  requirements: {
    type: String,
    required: [true, 'Please provide job requirements'],
  },
  salary: {
    type: String,
    required: [true, 'Please provide salary information'],
  },
  location: {
    type: String,
    required: [true, 'Please provide job location'],
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'remote'],
    default: 'full-time',
  },
  companyName: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true,
  },
  deadline: {
    type: Date,
    required: [true, 'Please provide application deadline'],
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Job', jobSchema);