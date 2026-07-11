const asyncHandler = require('../utils/asyncHandler');
const userService = require('../services/user.service');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const result = await userService.getProfile(req.user._id);
  res.json(result);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const result = await userService.updateProfile(req.user._id, req.body);
  res.json(result);
});

module.exports = {
  getProfile,
  updateProfile,
};