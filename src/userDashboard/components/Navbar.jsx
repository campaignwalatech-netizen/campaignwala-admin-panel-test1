import React, { useState } from "react";
import { Bell, Search, User, Menu, Sun, Moon } from "lucide-react";

const Navbar = ({ darkMode, setDarkMode, toggleSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header
      className={`fixed top-0 right-0 z-40 w-full border-b transition-all duration-300 ${
        darkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      } lg:ml-64`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        
        {/* LEFT SECTION: Brand + Sidebar + Theme Toggle */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Mobile Sidebar Toggle */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={toggleSidebar}
          >
            <Menu className={`w-5 h-5 ${darkMode ? "text-gray-300" : "text-gray-700"}`} />
          </button>

          {/* Brand Name */}
          <h1
            className={`text-lg sm:text-xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Campaign Wala
          </h1>
          
        </div>

        {/* RIGHT SECTION: Search + Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Input (Desktop/Tablet) */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search offers, leads, or profile..."
              className={`w-48 sm:w-64 lg:w-80 pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none transition-all ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          {/* Mobile Search Icon */}
          <button
            className="block md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className={`w-5 h-5 ${darkMode ? "text-gray-300" : "text-gray-700"}`} />
          </button>

          {/* Theme Toggle (Icon-based for compact design) */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-md border transition-all ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-yellow-400 hover:bg-gray-600"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <button
            className={`relative p-2 rounded-full transition-all ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
            title="Notifications"
          >
            <Bell className={`w-5 h-5 ${darkMode ? "text-gray-300" : "text-gray-600"}`} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Avatar */}
          <div
  className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
  title="Logout"
  onClick={() => {
    // Example logout logic
    localStorage.clear();
    window.location.href = "/"; // Redirect to login page
  }}
>
  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
</div>
        </div>
      </div>

      {/* MOBILE SEARCH BAR DROPDOWN */}
      {showSearch && (
        <div className="p-3 border-t md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none transition-all ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;