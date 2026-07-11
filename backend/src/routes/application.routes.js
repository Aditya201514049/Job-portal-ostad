const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const { applyJob, getMyApplications } = require('../controllers/application.controller');

router.post('/', protect, applyJob);
router.get('/my-applications', protect, getMyApplications);

module.exports = router;