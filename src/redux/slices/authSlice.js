import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define user roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
};

// Simple register async thunk
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, create a new user account and auto-login
      const response = {
        user: {
          id: Date.now(), // Simple ID generation
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          role: 'user' // New users default to 'user' role
        },
        accessToken: `user-token-${Date.now()}`,
        refreshToken: `user-refresh-${Date.now()}`
      };
      
      // Store in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userType', 'user');
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

// Simple login async thunk - simulate API call for now
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple credential check - replace with actual API call
      if (credentials.phoneNumber === '9876543210' && credentials.password === 'admin123') {
        const response = {
          user: {
            id: 1,
            name: 'Admin User',
            phoneNumber: '9876543210',
            role: 'admin'
          },
          accessToken: 'admin-token-123',
          refreshToken: 'admin-refresh-123'
        };
        
        // Store in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', 'admin');
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        return response;
      } else if (credentials.phoneNumber === '9876543211' && credentials.password === 'user123') {
        const response = {
          user: {
            id: 2,
            name: 'Regular User',
            phoneNumber: '9876543211',
            role: 'user'
          },
          accessToken: 'user-token-123',
          refreshToken: 'user-refresh-123'
        };
        
        // Store in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', 'user');
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        return response;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Logout async thunk
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Clear localStorage
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userType');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      return true;
    } catch (error) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  accessToken: localStorage.getItem('accessToken') || null,
  isAuthenticated: localStorage.getItem('isLoggedIn') === 'true',
  role: localStorage.getItem('userType') || USER_ROLES.GUEST,
  status: 'idle', // idle, loading, succeeded, failed
  error: null
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Reset auth state
    resetAuthState: () => initialState,
    
    // Update last activity
    updateLastActivity: (state) => {
      state.lastActivity = Date.now();
    }
  },
  
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.role = action.payload.user.role;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.role = USER_ROLES.GUEST;
      })
      
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.role = action.payload.user.role;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.role = USER_ROLES.GUEST;
      })
      
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.role = USER_ROLES.GUEST;
        state.error = null;
      });
  }
});

// Action creators
export const {
  clearError,
  resetAuthState,
  updateLastActivity
} = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.role;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsLoading = (state) => state.auth.status === 'loading';
export const selectIsAdmin = (state) => state.auth.role === USER_ROLES.ADMIN;
export const selectIsUser = (state) => state.auth.role === USER_ROLES.USER;

export default authSlice.reducer;