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
import UserPageWrapper from "../userDashboard/components/UserPageWrapper";

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
        
        {/* User Dashboard Routes - Direct Routes */}
        <Route path="/user/dashboard" element={<UserPageWrapper><UserDashboard /></UserPageWrapper>} />
        <Route path="/user/monthly-winners" element={<UserPageWrapper><MonthlyWinnerList /></UserPageWrapper>} />
        <Route path="/user/announcements" element={<UserPageWrapper><Announcement /></UserPageWrapper>} />
        <Route path="/user/attendance" element={<UserPageWrapper><Attendance /></UserPageWrapper>} />
        <Route path="/user/todays-leads" element={<UserPageWrapper><TodaysLeads /></UserPageWrapper>} />
        <Route path="/user/live-toppers" element={<UserPageWrapper><LiveToppersList /></UserPageWrapper>} />
        <Route path="/user/account-link" element={<UserPageWrapper><AccountLink /></UserPageWrapper>} />
        <Route path="/user/work-analytics" element={<UserPageWrapper><WorkAnalytics /></UserPageWrapper>} />
        <Route path="/user/faq" element={<UserPageWrapper><FAQ /></UserPageWrapper>} />
        <Route path="/user/pending-account" element={<UserPageWrapper><PendingAccount /></UserPageWrapper>} />
        <Route path="/user/completed-account" element={<UserPageWrapper><CompletedAccount /></UserPageWrapper>} />
        <Route path="/user/approved-account" element={<UserPageWrapper><ApprovedAccount /></UserPageWrapper>} />
        <Route path="/user/profile" element={<UserPageWrapper><ProfileDetails /></UserPageWrapper>} />
        <Route path="/user/salary" element={<UserPageWrapper><SalaryReceived /></UserPageWrapper>} />
        <Route path="/user/previous-leads" element={<UserPageWrapper><PreviousLeads /></UserPageWrapper>} />
        <Route path="/user/closed-leads" element={<UserPageWrapper><ClosedLeads /></UserPageWrapper>} />
        <Route path="/user/leaderboard" element={<UserPageWrapper><Leaderboard /></UserPageWrapper>} />
        
        {/* Legacy Routes for backward compatibility */}
        <Route path="/dashboard" element={<App />} />
      </Routes>
    </Router>
  );
}
