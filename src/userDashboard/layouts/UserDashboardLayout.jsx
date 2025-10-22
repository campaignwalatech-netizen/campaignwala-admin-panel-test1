import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Footer from '../components/Footer.jsx';

const UserDashboardLayout = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in and is a user type
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userType = localStorage.getItem("userType");
    
    console.log("UserDashboardLayout - Auth check:", {
      isLoggedIn: isLoggedIn,
      userType: userType,
      path: window.location.pathname
    });
    
    if (!isLoggedIn || userType !== "user") {
      console.log("UserDashboardLayout - Redirecting to login, auth failed");
      navigate("/");
    } else {
      console.log("UserDashboardLayout - Auth success, staying on page");
    }
  }, [navigate]);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const newTheme = localStorage.getItem("theme");
      setDarkMode(newTheme === "dark");
    };

    // Listen for storage changes (when theme is changed in other components)
    window.addEventListener('storage', handleThemeChange);
    
    // Also listen for custom theme change events
    window.addEventListener('themeChange', handleThemeChange);

    return () => {
      window.removeEventListener('storage', handleThemeChange);
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  const handleThemeToggle = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('themeChange'));
  };

  return (
    <div
      className={`flex ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar
        darkMode={darkMode}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          toggleSidebar={toggleSidebar}
        />
        <main className="p-6 min-h-screen">
          <Outlet /> {/* ✅ Always render Outlet - it handles all child routes including index */}
        </main>
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}

export default UserDashboardLayout;