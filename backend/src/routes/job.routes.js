const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
} = require('../controllers/job.controller');

router.route('/').get(getJobs).post(protect, createJob);
router.route('/my-posts').get(protect, getMyJobs);
router.route('/:id').get(getJobById).put(protect, updateJob).delete(protect, deleteJob);

module.exports = router;