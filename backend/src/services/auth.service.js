const User = require('../models/User');
const generateToken = require('../utils/generateToken');

class AuthService {
  async register(userData) {
    const { name, email, password, role } = userData;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'jobseeker',
    });

    if (!user) {
      throw new Error('Invalid user data');
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };
  }

  async login(email, password) {
    // Check for user email and password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      throw new Error('Invalid email or password');
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };
  }

  logout() {
    // In JWT, logout is handled by removing token on frontend
    // This method is for API completeness
    return { message: 'Logged out successfully' };
  }
}

module.exports = new AuthService();
