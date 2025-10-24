import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PendingLeads = ({ darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Detect active tab from URL
  useEffect(() => {
    if (location.pathname.includes("approved")) setActiveTab("Approved");
    else if (location.pathname.includes("rejected")) setActiveTab("Rejected");
    else if (location.pathname.includes("pending")) setActiveTab("Pending");
    else setActiveTab("");
  }, [location.pathname]);

  const leads = [
    { id: "PL001", name: "Akash Sharma", category: "Axis Bank", offer: "Axis Bank", date: "2024-07-20", status: "Awaiting Partner Confirmation" },
    { id: "PL002", name: "Priya Singh", category: "HDFC Bank", offer: "HDFC Bank", date: "2024-07-19", status: "Awaiting Partner Confirmation" },
    { id: "PL003", name: "Rahul Kumar", category: "ICICI Bank", offer: "ICICI Bank", date: "2024-07-18", status: "Admin Review Pending" },
    { id: "PL004", name: "Sneha Gupta", category: "SBI Bank", offer: "SBI Bank", date: "2024-07-17", status: "Awaiting Partner Confirmation" },
    { id: "PL005", name: "Vikram Reddy", category: "Kotak Mahindra", offer: "Kotak Mahindra", date: "2024-07-16", status: "Admin Review Pending" },
    { id: "PL006", name: "Anjali Desai", category: "PNB Bank", offer: "PNB Bank", date: "2024-07-15", status: "Awaiting Partner Confirmation" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Pending") navigate("/user/pending-leads");
    if (tab === "Approved") navigate("/user/approved-leads");
    if (tab === "Rejected") navigate("/user/rejected-leads");
  };

  // 🔍 Filter logic
  const filteredLeads = leads.filter((lead) => {
    const matchesCategory =
      categoryFilter === "All" || lead.category === categoryFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.offer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className={`min-h-screen pt-20 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8 pb-8 max-w-7xl mx-auto">
        {/* Page Title */}
        <h1
          className={`text-2xl sm:text-3xl font-semibold mb-6 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Pending Leads
        </h1>

        {/* 🔽 Filter Section */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-6">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={`px-4 py-2 rounded-md border text-sm sm:text-base w-full sm:w-1/3 ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : "bg-white border-gray-300 text-gray-800"
            }`}
          >
            <option value="All">All Categories</option>
            <option value="Axis Bank">Axis Bank</option>
            <option value="HDFC Bank">HDFC Bank</option>
            <option value="ICICI Bank">ICICI Bank</option>
            <option value="SBI Bank">SBI Bank</option>
            <option value="Kotak Mahindra">Kotak Mahindra</option>
            <option value="PNB Bank">PNB Bank</option>
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name or offer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`px-4 py-2 rounded-md border text-sm sm:text-base w-full sm:w-1/3 ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
            }`}
          />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b pb-2">
          {["Pending", "Approved", "Rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-4 sm:px-6 py-2 text-sm sm:text-base font-medium rounded-t-md transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab} Leads
            </button>
          ))}
        </div>

        {/* Table Container */}
        <div
          className={`rounded-lg border ${
            darkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
          } shadow-sm`}
        >
          <h2
            className={`text-lg sm:text-xl font-semibold p-4 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            Leads Awaiting Review
          </h2>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm sm:text-base">
              <thead
                className={`${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <tr>
                  <th className="text-left px-4 py-3">Lead ID</th>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Category</th>
                  <th className="text-left px-4 py-3">Offer</th>
                  <th className="text-left px-4 py-3 whitespace-nowrap">
                    Created Date
                  </th>
                  <th className="text-left px-4 py-3">Sub-Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className={`border-t ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      } hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
                    >
                      <td className="px-4 py-3 font-medium whitespace-nowrap">
                        {lead.id}
                      </td>
                      <td className="px-4 py-3">{lead.name}</td>
                      <td className="px-4 py-3">{lead.category}</td>
                      <td className="px-4 py-3">{lead.offer}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {lead.date}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                            lead.status.includes("Awaiting")
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-4 text-gray-500 dark:text-gray-400"
                    >
                      No leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile-Friendly Cards */}
          <div className="sm:hidden flex flex-col gap-4 p-4">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className={`p-4 rounded-lg border ${
                    darkMode
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-200 bg-white"
                  } shadow-sm`}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{lead.name}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lead.status.includes("Awaiting")
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-sm">
                    <strong>ID:</strong> {lead.id}
                  </p>
                  <p className="text-sm">
                    <strong>Category:</strong> {lead.category}
                  </p>
                  <p className="text-sm">
                    <strong>Offer:</strong> {lead.offer}
                  </p>
                  <p className="text-sm">
                    <strong>Created:</strong> {lead.date}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No leads found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingLeads;
