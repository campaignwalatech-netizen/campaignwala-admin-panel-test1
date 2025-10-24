import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  selectIsAuthenticated,
  selectUser,
  selectUserRole,
  selectAuthError,
  selectIsLoading,
  loginUser,
  registerUser,
  logoutUser,
  clearError
} from '../redux/slices/authSlice';

/**
 * Simple Auth Hook
 * Provides basic authentication functionality
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const userRole = useSelector(selectUserRole);
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectIsLoading);

  // Login function
  const login = useCallback(async (credentials) => {
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      
      // Redirect based on user role
      if (result.user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else if (result.user.role === 'user') {
        navigate('/user', { replace: true });
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  }, [dispatch, navigate]);

  // Register function
  const register = useCallback(async (userData) => {
    try {
      const result = await dispatch(registerUser(userData)).unwrap();
      
      // New users are always 'user' role - redirect to user dashboard
      navigate('/user', { replace: true });
      
      return result;
    } catch (error) {
      throw error;
    }
  }, [dispatch, navigate]);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/', { replace: true });
    } catch (error) {
      // Force logout even if server call fails
      navigate('/', { replace: true });
    }
  }, [dispatch, navigate]);

  // Clear error function
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Get user display name
  const getDisplayName = useCallback(() => {
    if (!user) return '';
    return user.displayName || user.name || user.phoneNumber || 'User';
  }, [user]);

  return {
    // State
    isAuthenticated,
    user,
    userRole,
    error,
    isLoading,

    // Actions
    login,
    register,
    logout,
    clearAuthError,

    // Utilities
    getDisplayName,

    // Role checks
    isAdmin: userRole === 'admin',
    isUser: userRole === 'user'
  };
};
