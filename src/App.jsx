import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./adminDashboard/components/Sidebar";
import Header from "./adminDashboard/components/Header";
import ProductsTable from "./adminDashboard/components/ProductsTable";
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

export default function App() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => {
    // Load theme from localStorage, default to dark if not set
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'light' ? false : true;
  });
  const [currentView, setCurrentView] = useState("manage-account");

  useEffect(() => {
    // Check if user is logged in and is an admin
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userType = localStorage.getItem("userType");
    
    if (!isLoggedIn || userType !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    // Apply theme on initial load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    // Update theme and save to localStorage
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleMenuSelect = (menuKey) => {
    setCurrentView(menuKey);
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
          onThemeToggle={() => setIsDark(!isDark)}
          currentView={currentView}
        />
        <main className="flex-1 overflow-auto scrollbar-hide bg-background">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
