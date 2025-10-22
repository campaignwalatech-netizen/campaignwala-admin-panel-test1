import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserRole } from '../redux/slices/authSlice';

// Components
import Loader from '../components/Loader';

// Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/Register';
import OtpVerification from '../pages/auth/OtpVerification';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import NotFoundPage from '../pages/error/NotFoundPage';
import UnauthorizedPage from '../pages/error/UnauthorizedPage';

// Admin Components
import AdminDashboard from '../App';

// User Dashboard Components
import UserDashboardLayout from '../userDashboard/layouts/UserDashboardLayout';
import {
  UserDashboard,
  MonthlyWinnerList,
  Announcement,
  Attendance,
  TodaysLeads,
  ProfileDetails,
  WorkAnalytics,
  FAQ,
  LiveToppersList,
  AccountLink,
  PendingAccount,
  CompletedAccount,
  ApprovedAccount,
  SalaryReceived,
  PreviousLeads,
  ClosedLeads,
  Leaderboard
} from '../userDashboard/pages/index.jsx';

/**
 * Protected Route Component
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

/**
 * Public Route Component
 */
const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);

  if (isAuthenticated) {
    // Redirect based on user role
    if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (userRole === 'user') {
      return <Navigate to="/user/dashboard" replace />;
    }
  }

  return children;
};

/**
 * Loading component
 */
const RouteLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader />
  </div>
);

/**
 * Main Application Router
 */
export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          
          <Route
            path="/verify-otp"
            element={
              <PublicRoute>
                <OtpVerification />
              </PublicRoute>
            }
          />
          
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPasswordPage />
              </PublicRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/user/*"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="monthly-winners" element={<MonthlyWinnerList />} />
            <Route path="announcements" element={<Announcement />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="todays-leads" element={<TodaysLeads />} />
            <Route path="live-toppers" element={<LiveToppersList />} />
            <Route path="account-link" element={<AccountLink />} />
            <Route path="work-analytics" element={<WorkAnalytics />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="pending-account" element={<PendingAccount />} />
            <Route path="completed-account" element={<CompletedAccount />} />
            <Route path="approved-account" element={<ApprovedAccount />} />
            <Route path="profile" element={<ProfileDetails />} />
            <Route path="salary" element={<SalaryReceived />} />
            <Route path="previous-leads" element={<PreviousLeads />} />
            <Route path="closed-leads" element={<ClosedLeads />} />
            <Route path="leaderboard" element={<Leaderboard />} />
          </Route>

          {/* Error Routes */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/404" element={<NotFoundPage />} />

          {/* Legacy Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Navigate to="/admin/dashboard" replace />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
