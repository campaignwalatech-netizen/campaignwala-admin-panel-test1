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

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Sidebar */}
        <Sidebar darkMode={darkMode} />
        
        {/* Main Content */}
        <div className="ml-64 min-h-screen">
          {/* Navbar */}
          <Navbar />
          
          {/* Page Content */}
          <main className="pb-20">
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