import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RejectedLeads = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("Rejected");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const leadsData = [
    { id: "R001", name: "John Doe", category: "DEMAT Account", offer: "#123456", created: "2024-07-15", rejected: "2024-07-20", reason: "Incomplete Documents", contact: "9876543210" },
    { id: "R002", name: "Jane Smith", category: "Bank Account", offer: "#789012", created: "2024-07-14", rejected: "2024-07-19", reason: "Invalid Information", contact: "9988776655" },
    { id: "R003", name: "Robert Johnson", category: "DEMAT Account", offer: "#345678", created: "2024-07-13", rejected: "2024-07-18", reason: "Duplicate Entry", contact: "9123456789" },
    { id: "R004", name: "Maria Garcia", category: "Bank Account", offer: "#901234", created: "2024-07-12", rejected: "2024-07-17", reason: "Age Requirement Not Met", contact: "9001122334" },
  ];

  // 🔍 Apply filter and search
  const filteredLeads = leadsData.filter((lead) => {
    const matchesCategory = filter === "All" || lead.category === filter;
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.contact.includes(search);
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
      className={`min-h-screen pt-20 px-4 sm:px-6 lg:px-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h2
          className={`text-2xl sm:text-3xl font-semibold mb-6 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Rejected Leads
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b">
          {["Pending", "Approved", "Rejected"].map((tab) => (
            <button
              key={tab}
              className={`px-4 sm:px-6 py-2 text-sm sm:text-base font-medium rounded-t-md transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab} Leads
            </button>
          ))}
        </div>

        {/* 🔍 Search + 🔽 Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by lead name or contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full sm:w-1/2 px-4 py-2 rounded-md border text-sm sm:text-base ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-700 placeholder-gray-500"
            }`}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`px-4 py-2 rounded-md border text-sm sm:text-base ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : "bg-white border-gray-300 text-gray-700"
            }`}
          >
            <option value="All">All Categories</option>
            <option value="DEMAT Account">DEMAT Account</option>
            <option value="Bank Account">Bank Account</option>
          </select>
        </div>

        {/* Table Section */}
        <div
          className={`rounded-lg border shadow-sm overflow-hidden ${
            darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
          }`}
        >
          <div
            className={`p-4 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h3
              className={`text-base sm:text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Rejected Leads Overview
            </h3>
          </div>

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
                  <th className="text-left px-4 py-3">Lead Name</th>
                  <th className="text-left px-4 py-3">Contact</th>
                  <th className="text-left px-4 py-3">Category</th>
                  <th className="text-left px-4 py-3">Offer</th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">
                    Created Date
                  </th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">
                    Rejected Date
                  </th>
                  <th className="text-left px-4 py-3 hidden lg:table-cell">
                    Rejection Reason
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className={`border-t ${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{lead.id}</td>
                    <td className="px-4 py-3">{lead.name}</td>
                    <td className="px-4 py-3">{lead.contact}</td>
                    <td className="px-4 py-3">{lead.category}</td>
                    <td className="px-4 py-3">{lead.offer}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {lead.created}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {lead.rejected}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {lead.reason}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredLeads.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-6 text-gray-500 italic"
                    >
                      No leads found matching your search or filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="block sm:hidden p-4 space-y-4">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className={`p-4 rounded-lg border ${
                  darkMode
                    ? "border-gray-700 bg-gray-700"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex justify-between text-sm font-medium">
                  <span>{lead.name}</span>
                  <span className="text-red-500">{lead.reason}</span>
                </div>
                <div className="text-xs mt-2 text-gray-400">
                  ID: {lead.id} • {lead.category}
                </div>
                <div className="text-xs mt-1 text-gray-400">
                  Contact: {lead.contact}
                </div>
                <div className="text-xs mt-1 text-gray-400">
                  Created: {lead.created}
                </div>
                <div className="text-xs mt-1 text-gray-400">
                  Rejected: {lead.rejected}
                </div>
              </div>
            ))}

            {filteredLeads.length === 0 && (
              <p className="text-center text-sm text-gray-400 italic">
                No leads found for this category
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectedLeads;
