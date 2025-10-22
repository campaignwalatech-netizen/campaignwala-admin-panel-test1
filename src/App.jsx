import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  selectIsAuthenticated, 
  selectUserRole, 
  updateLastActivity,
  logoutUser
} from "./redux/slices/authSlice";

// Components
import Sidebar from "./adminDashboard/components/Sidebar";
import Header from "./adminDashboard/components/Header";
import { DefaultView } from "./adminDashboard/components/DummyForms";

// Manage Account
import AllProductsTable from "./adminDashboard/forms/AllProductsTable";
import AddProjectForm from "./adminDashboard/forms/AddProjectForm";
import ApproveProjectTable from "./adminDashboard/forms/ApproveProjectTable";

// Manage Category
import AllCategoriesTable from "./adminDashboard/forms/AllCategoriesTable";
import AddCategoryForm from "./adminDashboard/forms/AddCategoryForm";

// Leads
import ABCAnalytics from "./adminDashboard/forms/ABCAnalytics";
import LeadsTable from "./adminDashboard/forms/LeadsTable";

// User Management
import UsersTable from "./adminDashboard/forms/UsersTable";

// Slide Board
import AllSlidesTable from "./adminDashboard/forms/AllSlidesTable";
import AddSlideForm from "./adminDashboard/forms/AddSlideForm";

// Payment Withdrawal
import PaymentWithdrawalTable from "./adminDashboard/forms/PaymentWithdrawalTable";

// Miscellaneous
import ResetPasswordForm from "./adminDashboard/forms/ResetPasswordForm";
import AdminLogsTable from "./adminDashboard/forms/AdminLogsTable";
import UserQueriesTable from "./adminDashboard/forms/UserQueriesTable";

/**
 * Admin Dashboard Component
 * Main application component for admin users with advanced state management
 */
export default function App() {
  const dispatch = useDispatch();
  
  // Redux state
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);
  
  // Local state
  const [currentView, setCurrentView] = useState("manage-account");
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'light' ? false : true;
  });

  // Session management
  useEffect(() => {
    // Update last activity on component mount and user interactions
    const handleUserActivity = () => {
      dispatch(updateLastActivity());
    };

    // Add event listeners for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
    };
  }, [dispatch]);

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Authorization check
  if (!isAuthenticated || userRole !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Access Denied
          </h2>
          <p className="text-muted-foreground">
            You don't have permission to access this admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  const handleMenuSelect = (menuKey) => {
    setCurrentView(menuKey);
    dispatch(updateLastActivity());
  };

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  const renderContent = () => {
    switch (currentView) {
      // Manage Account submenu
      case "all-products":
        return <AllProductsTable />;
      case "add-project":
        return <AddProjectForm />;
      case "approve-project":
        return <ApproveProjectTable />;
      case "manage-account":
        return <AllProductsTable />;

      // Manage Category submenu
      case "all-categories":
        return <AllCategoriesTable />;
      case "add-category":
        return <AddCategoryForm />;
      case "manage-category":
        return <AllCategoriesTable />;

      // Leads submenu
      case "abc-analytics":
        return <ABCAnalytics />;
      case "leads-pending":
        return <LeadsTable status="pending" />;
      case "leads-approved":
        return <LeadsTable status="approved" />;
      case "leads-completed":
        return <LeadsTable status="completed" />;
      case "leads-rejected":
        return <LeadsTable status="rejected" />;
      case "leads":
        return <ABCAnalytics />;

      // User Management submenu
      case "all-active-users":
        return <UsersTable userType="active" />;
      case "all-hold-users":
        return <UsersTable userType="hold" />;
      case "all-ex-users":
        return <UsersTable userType="ex" />;
      case "user-management":
        return <UsersTable userType="active" />;

      // Slide Board submenu
      case "all-slides":
        return <AllSlidesTable />;
      case "add-slide":
        return <AddSlideForm />;
      case "slideboard":
        return <AllSlidesTable />;

      // Payment Withdrawal List
      case "payment-withdrawal":
        return <PaymentWithdrawalTable />;

      // Miscellaneous submenu
      case "reset-password":
        return <ResetPasswordForm />;
      case "admin-logs":
        return <AdminLogsTable />;
      case "user-queries":
        return <UserQueriesTable />;
      case "miscellaneous":
        return <ResetPasswordForm />;

      // Default/fallback
      default:
        return <DefaultView />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar onMenuSelect={handleMenuSelect} activeKey={currentView} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        <Header
          isDark={isDark}
          onThemeToggle={handleThemeToggle}
          currentView={currentView}
        />
        <main className="flex-1 overflow-auto scrollbar-hide bg-background">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
