import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

const Navbar = ({ darkMode, onMenuClick, onThemeToggle }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // apply theme to <html> tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    if (onThemeToggle) {
      onThemeToggle();
    } else {
      // Fallback if onThemeToggle is not provided
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
      {/* Mobile menu button */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
          Welcome Back, <span className="text-gray-700 dark:text-gray-300">#user!</span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Toggle Switch */}
        <button
          onClick={toggleTheme}
          className="relative w-12 sm:w-14 h-6 sm:h-7 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full transition-all duration-300 focus:outline-none"
        >
          <span
            className={`absolute left-1 top-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              darkMode ? "translate-x-6 sm:translate-x-7" : ""
            }`}
          ></span>
          <span className="absolute left-1.5 sm:left-2 text-xs text-gray-700 dark:text-gray-400">
            ☀️
          </span>
          <span className="absolute right-1.5 sm:right-2 text-xs text-gray-700 dark:text-gray-400">
            🌙
          </span>
        </button>

        {/* User Avatar with Logout */}
        <div className="relative group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-300 dark:bg-gray-500 cursor-pointer transition-colors"></div>
          <div className="absolute right-0 top-10 hidden group-hover:block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-2 min-w-[120px] z-10">
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;