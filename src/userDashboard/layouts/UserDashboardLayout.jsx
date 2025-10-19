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
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Sidebar */}
        <Sidebar 
          darkMode={darkMode} 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Main Content */}
        <div className="lg:ml-64 min-h-screen">
          {/* Navbar */}
          <Navbar 
            darkMode={darkMode}
            onMenuClick={() => setSidebarOpen(true)}
            onThemeToggle={handleThemeToggle}
          />
          
          {/* Page Content */}
          <main className="pb-20 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;