import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // apply theme to <html> tag
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Welcome Back, <span className="text-gray-700 dark:text-gray-300">#user!</span>
      </h1>

      <div className="flex items-center gap-3">
        {/* Toggle Switch */}
        <button
          onClick={toggleTheme}
          className="relative w-14 h-7 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full transition-all duration-300 focus:outline-none"
        >
          <span
            className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              theme === "dark" ? "translate-x-7" : ""
            }`}
          ></span>
          <span className="absolute left-2 text-xs text-gray-700 dark:text-gray-400">
            ☀️
          </span>
          <span className="absolute right-2 text-xs text-gray-700 dark:text-gray-400">
            🌙
          </span>
        </button>

        {/* User Avatar with Logout */}
        <div className="relative group">
          <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-500 cursor-pointer"></div>
          <div className="absolute right-0 top-10 hidden group-hover:block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-2 min-w-[120px]">
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
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