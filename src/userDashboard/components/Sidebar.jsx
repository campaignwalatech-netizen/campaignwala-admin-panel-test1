import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, Wallet, User, ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = ({ darkMode, isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/user" },
    { icon: Users, label: "All Leads", path: "/user/all-leads" },
    { icon: Wallet, label: "Wallet", path: "/user/wallet-withdrawl" }, // ✅ Updated Path
    { icon: User, label: "Profile", path: "/user/profile-overview" }, 
  ];

  const handleItemClick = (path) => {
    navigate(path);
  };

  const handleCollapse = () => {
    toggleSidebar();
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-full transition-all duration-300 ease-in-out 
      ${isSidebarOpen ? "w-64" : "w-16"} 
      ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"} 
      border-r shadow-md`}
    >
      {/* Header */}
      <div
        className={`p-4 border-b flex items-center justify-between 
        ${darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"}`}
      >
        {isSidebarOpen && (
          <h2 className="text-lg font-semibold whitespace-nowrap">Campaign Wala</h2>
        )}
        <button
          onClick={handleCollapse}
          className={`p-2 rounded-md transition-colors 
          ${darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"}`}
        >
          {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleItemClick(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 
                ${
                  isActive
                    ? darkMode
                      ? "bg-gray-800 text-white border-l-2 border-blue-500"
                      : "bg-gray-100 text-gray-900 border-l-2 border-blue-600"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              title={!isSidebarOpen ? item.label : ""}
            >
              <item.icon className="flex-shrink-0" size={20} />
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;