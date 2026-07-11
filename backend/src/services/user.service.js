const User = require('../models/User');

class UserService {
  async getProfile(userId) {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async updateProfile(userId, updateData) {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.name = updateData.name || user.name;
    user.email = updateData.email || user.email;

    if (updateData.password) {
      user.password = updateData.password;
    }

    const updatedUser = await user.save();

    return {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    };
  }
}

module.exports = new UserService();
