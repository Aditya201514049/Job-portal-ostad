import { useAuth } from '../context/AuthContext';
import useAuthStore from '../store/authStore';
import { authAPI } from '../api/auth.api';

export const useAuthActions = () => {
  const { logout } = useAuth();
  const setAuth = useAuthStore((state) => state.setAuth);

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      setAuth(response.data, response.data.token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      setAuth(response.data, response.data.token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
    }
  };

  return { register, login, logout: handleLogout };
};
