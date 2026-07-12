import { createContext, useContext, useEffect } from 'react';
import useAuthStore from '../store/authStore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, token, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    // Check if token exists in localStorage on mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser && !isAuthenticated) {
      useAuthStore.getState().setAuth(JSON.parse(storedUser), storedToken);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
