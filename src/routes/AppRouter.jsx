import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/Register";
import OtpVerification from "../pages/auth/OtpVerification";
import App from "../App";
import { UserDashboardLayout } from "../userDashboard/pages";

import Dashboard from "../userDashboard/components/Dashboard";
import AllLeads from "../userDashboard/pages/AllLeads";
import ApprovedLeads from "../userDashboard/layouts/ApprovedLeads";
import PendingLeads from "../userDashboard/layouts/PendingLeads";
import RejectedLeads from "../userDashboard/layouts/RejectedLeads";
import Wallet from "../userDashboard/pages/wallet";
import Profile from "../userDashboard/pages/profile";
import DematAccount from "../userDashboard/layouts/DematAccount";
import ZeroFeeDemat from "../userDashboard/layouts/ZeroFreeDemat";
import WalletAndWithdrawl from "../userDashboard/layouts/Wallet&Withdrawl";
import ProfileOverview from "../userDashboard/layouts/ProfileOverview";
import KYCDetails from "../userDashboard/layouts/KYCDetails";
import TotalBalance from "../userDashboard/layouts/TotalBalance";

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
  // ✅ Load and store theme preference
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<OtpVerification />} />

        {/* Admin Dashboard */}
        <Route path="/admin/*" element={<App />} />

        {/* ✅ User Dashboard */}
        <Route
          path="/user/*"
          element={<UserDashboardLayout darkMode={darkMode} setDarkMode={setDarkMode} />}
        >
          <Route index element={<Dashboard darkMode={darkMode} />} />
          <Route path="all-leads" element={<AllLeads darkMode={darkMode} />} />
          <Route path="pending-leads" element={<PendingLeads darkMode={darkMode} />} />
          <Route path="approved-leads" element={<ApprovedLeads darkMode={darkMode} />} />
          <Route path="rejected-leads" element={<RejectedLeads darkMode={darkMode} />} />
          <Route path="wallet" element={<Wallet darkMode={darkMode} />} />
          <Route path="profile" element={<Profile darkMode={darkMode} />} />
          <Route path="demat-account" element={<DematAccount darkMode={darkMode} />} />
          <Route path="zerofee-demat" element={<ZeroFeeDemat darkMode={darkMode} />} />
          <Route path="wallet-withdrawl" element={<WalletAndWithdrawl darkMode={darkMode} />} />
          <Route path="profile-overview" element={<ProfileOverview darkMode={darkMode} />} />
          <Route path="kyc-details" element={<KYCDetails darkMode={darkMode} />} />
          <Route path="total-balance" element={<TotalBalance darkMode={darkMode} />} />
        </Route>
      </Routes>
    </Router>
  );
}

