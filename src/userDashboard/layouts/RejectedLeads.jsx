import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RejectedLeads = ({ darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Rejected");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Detect active tab from URL
  useEffect(() => {
    if (location.pathname.includes("approved")) setActiveTab("Approved");
    else if (location.pathname.includes("rejected")) setActiveTab("Rejected");
    else if (location.pathname.includes("pending")) setActiveTab("Pending");
    else setActiveTab("");
  }, [location.pathname]);

  // Dummy Data
  const leads = [
    {
      id: "R001",
      name: "John Doe",
      category: "Axis Bank",
      offer: "Axis Credit Card",
      created: "2024-07-15",
      rejected: "2024-07-20",
      reason: "Incomplete Documents",
      contact: "9876543210",
    },
    {
      id: "R002",
      name: "Jane Smith",
      category: "HDFC Bank",
      offer: "HDFC Savings Account",
      created: "2024-07-14",
      rejected: "2024-07-19",
      reason: "Invalid Information",
      contact: "9988776655",
    },
    {
      id: "R003",
      name: "Robert Johnson",
      category: "ICICI Bank",
      offer: "ICICI Demat Account",
      created: "2024-07-13",
      rejected: "2024-07-18",
      reason: "Duplicate Entry",
      contact: "9123456789",
    },
    {
      id: "R004",
      name: "Maria Garcia",
      category: "SBI Bank",
      offer: "SBI Credit Card",
      created: "2024-07-12",
      rejected: "2024-07-17",
      reason: "Age Requirement Not Met",
      contact: "9001122334",
    },
  ];

  // 🔍 Filter logic
  const filteredLeads = leads.filter((lead) => {
    const matchesCategory =
      categoryFilter === "All" || lead.category === categoryFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.offer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contact.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Pending") navigate("/user/pending-leads");
    if (tab === "Approved") navigate("/user/approved-leads");
    if (tab === "Rejected") navigate("/user/rejected-leads");
  };

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
          Rejected Leads
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
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name, offer, or contact..."
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
            Rejected Leads Overview
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
                  <th className="text-left px-4 py-3 whitespace-nowrap">
                    Rejected Date
                  </th>
                  <th className="text-left px-4 py-3">Reason</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className={`border-t hover:bg-gray-50 transition ${
                        darkMode
                          ? "border-gray-700 hover:bg-gray-700/40"
                          : "border-gray-200"
                      }`}
                    >
                      <td className="py-3 px-4">{lead.id}</td>
                      <td className="py-3 px-4">{lead.name}</td>
                      <td className="py-3 px-4">{lead.category}</td>
                      <td className="py-3 px-4">{lead.offer}</td>
                      <td className="py-3 px-4">{lead.created}</td>
                      <td className="py-3 px-4">{lead.rejected}</td>
                      <td className="py-3 px-4 text-red-500 font-medium">
                        {lead.reason}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-4 text-gray-500 dark:text-gray-400"
                    >
                      No rejected leads found.
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
                    <span className="text-sm text-red-500">{lead.reason}</span>
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
                    <strong>Created:</strong> {lead.created}
                  </p>
                  <p className="text-sm">
                    <strong>Rejected:</strong> {lead.rejected}
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

export default RejectedLeads;
