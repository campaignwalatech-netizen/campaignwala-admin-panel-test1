import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/Register";
import OtpVerification from "../pages/auth/OtpVerification";
import App from "../App";
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
} from "../userDashboard/pages/index.jsx";
import UserDashboardLayout from "../userDashboard/layouts/UserDashboardLayout";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        
        {/* Admin Dashboard Routes - Original App.jsx */}
        <Route path="/admin/dashboard" element={<App />} />
        <Route path="/admin/*" element={<App />} />
        
        {/* User Dashboard Routes - Using Layout */}
        <Route path="/user/*" element={<UserDashboardLayout />}>
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
        
        {/* Legacy Routes for backward compatibility */}
        <Route path="/dashboard" element={<App />} />
      </Routes>
    </Router>
  );
}
