import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const AllLeads = ({ darkMode = useOutletContext() }) => {
  const [activeTab, setActiveTab] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const leadsData = [
    { id: "L001", name: "Ravi Kumar", contact: "9876543210", category: "DEMAT Account", offer: "dfghjfgd", created: "2024-07-28", approved: "2023-10-03", status: "Approved" },
    { id: "L002", name: "Priya Sharma", contact: "8765432109", category: "Bank Account", offer: "dsfhjgf", created: "2024-07-27", approved: "2023-10-03", status: "Pending" },
    { id: "L003", name: "Amit Singh", contact: "7654321098", category: "DEMAT Account", offer: "dsfhjghf", created: "2024-07-26", approved: "2023-05-14", status: "Rejected" },
    { id: "L004", name: "Sneha Reddy", contact: "6543210987", category: "Bank Account", offer: "fdghjkgf", created: "2022-12-20", approved: "2024-07-25", status: "Approved" },
    { id: "L005", name: "Deepak Verma", contact: "5432109876", category: "DEMAT Account", offer: "fdgjkhgf", created: "2024-07-24", approved: "2021-06-13", status: "Pending" },
    { id: "L006", name: "Anita Devi", contact: "4321098765", category: "Bank Account", offer: "fgjhfgd", created: "2024-07-23", approved: "2025-08-13", status: "Approved" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "Pending":
        navigate("/user/pending-leads");
        break;
      case "Approved":
        navigate("/user/approved-leads");
        break;
      case "Rejected":
        navigate("/user/rejected-leads");
        break;
      default:
        break;
    }
  };

  // 🔍 Filter leads by category + search
  const filteredLeads = leadsData.filter((lead) => {
    const matchesCategory =
      categoryFilter === "All" || lead.category === categoryFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contact.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className={`min-h-screen pt-8 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Title */}
        <div className="mb-6 text-center sm:text-left px-2">
          <h2
            className={`text-2xl sm:text-3xl font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            All Leads
          </h2>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-6 px-2">
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
            <option value="DEMAT Account">DEMAT Account</option>
            <option value="Bank Account">Bank Account</option>
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name or contact..."
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
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6 border-b pb-2 px-2">
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

        {/* Table Container */}
        <div
          className={`rounded-lg border mx-2 ${
            darkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
          } shadow-sm overflow-hidden`}
        >
          {/* Header */}
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
              Recent Leads Overview
            </h3>
            <p
              className={`text-xs sm:text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Showing your most recent leads across all statuses.
            </p>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm">
              <thead
                className={`${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <tr>
                  <th className="text-left px-3 sm:px-4 py-2">Lead ID</th>
                  <th className="text-left px-3 sm:px-4 py-2">Name</th>
                  <th className="text-left px-3 sm:px-4 py-2 hidden lg:table-cell">Contact</th>
                  <th className="text-left px-3 sm:px-4 py-2 hidden md:table-cell">Category</th>
                  <th className="text-left px-3 sm:px-4 py-2 hidden lg:table-cell">Offer</th>
                  <th className="text-left px-3 sm:px-4 py-2">Created</th>
                  <th className="text-left px-3 sm:px-4 py-2 hidden md:table-cell">Approved</th>
                  <th className="text-left px-3 sm:px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className={`border-t ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <td className="px-3 sm:px-4 py-2 font-medium">{lead.id}</td>
                      <td className="px-3 sm:px-4 py-2">{lead.name}</td>
                      <td className="px-3 sm:px-4 py-2 hidden lg:table-cell">{lead.contact}</td>
                      <td className="px-3 sm:px-4 py-2 hidden md:table-cell">{lead.category}</td>
                      <td className="px-3 sm:px-4 py-2 hidden lg:table-cell">{lead.offer}</td>
                      <td className="px-3 sm:px-4 py-2">{lead.created}</td>
                      <td className="px-3 sm:px-4 py-2 hidden md:table-cell">{lead.approved}</td>
                      <td className="px-3 sm:px-4 py-2">
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                            lead.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : lead.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      No leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllLeads;
