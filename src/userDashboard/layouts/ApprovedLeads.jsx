import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ApprovedLeads = ({ darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Approved");
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Detect active tab dynamically
  useEffect(() => {
    if (location.pathname.includes("approved")) setActiveTab("Approved");
    else if (location.pathname.includes("pending")) setActiveTab("Pending");
    else if (location.pathname.includes("rejected")) setActiveTab("Rejected");
    else setActiveTab("");
  }, [location.pathname]);

  const leadsData = [
    {
      id: 17,
      name: "Sarah Johnson",
      contact: "9876543210",
      category: "DEMAT Account",
      offer: "$456",
      created: "2024-07-20",
      approved: "20/01/2022",
      commission: "$954",
    },
    {
      id: 67,
      name: "Michael Brown",
      contact: "9123456780",
      category: "Bank Account",
      offer: "#252852",
      created: "2024-07-19",
      approved: "11/12/2022",
      commission: "$256",
    },
    {
      id: 20,
      name: "Emily Davis",
      contact: "9988776655",
      category: "DEMAT Account",
      offer: "#4558266",
      created: "2024-07-18",
      approved: "17/09/2024",
      commission: "$127",
    },
    {
      id: 91,
      name: "David Wilson",
      contact: "9090909090",
      category: "Bank Account",
      offer: "#852862",
      created: "2024-07-17",
      approved: "02/06/2023",
      commission: "$683",
    },
    {
      id: 84,
      name: "Jessica Garcia",
      contact: "8080808080",
      category: "DEMAT Account",
      offer: "#1345621",
      created: "2024-07-16",
      approved: "13/05/2025",
      commission: "$838",
    },
  ];

  // 🔍 Filter + Search logic
  const filteredLeads = leadsData.filter((lead) => {
    const matchesCategory = filter === "All" || lead.category === filter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      className={`min-h-screen pt-20 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        {/* Page Title */}
        <h2
          className={`text-2xl sm:text-3xl font-semibold mb-6 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Approved Leads
        </h2>

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

        {/* 🔽 Filter + Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by Lead Name or Contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full sm:w-1/2 px-4 py-2 rounded-md border text-sm sm:text-base ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-700 placeholder-gray-500"
            }`}
          />

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`w-full sm:w-auto px-4 py-2 rounded-md border text-sm sm:text-base ${
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
          className={`rounded-lg border shadow-sm ${
            darkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-white"
          }`}
        >
          <div
            className={`p-4 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h3
              className={`text-lg sm:text-xl font-semibold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Approved Leads Overview
            </h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Filter and search through all approved leads.
            </p>
          </div>

          {/* Desktop Table */}
          {filteredLeads.length > 0 ? (
            <div className="overflow-x-auto hidden sm:block">
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
                    <th className="text-left px-4 py-3 whitespace-nowrap">
                      Created Date
                    </th>
                    <th className="text-left px-4 py-3 whitespace-nowrap">
                      Approved Date
                    </th>
                    <th className="text-left px-4 py-3 whitespace-nowrap">
                      Commission
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
                      } transition-colors`}
                    >
                      <td className="px-4 py-3 font-medium">{lead.id}</td>
                      <td className="px-4 py-3">{lead.name}</td>
                      <td className="px-4 py-3">{lead.contact}</td>
                      <td className="px-4 py-3">{lead.category}</td>
                      <td className="px-4 py-3">{lead.offer}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {lead.created}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {lead.approved}
                      </td>
                      <td className="px-4 py-3">{lead.commission}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500 italic">
              No leads found matching your criteria.
            </div>
          )}

          {/* Mobile-Friendly Layout */}
          <div className="sm:hidden flex flex-col gap-4 p-4">
            {filteredLeads.map((lead) => (
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
                  <span className="text-sm font-medium text-blue-600">
                    {lead.commission}
                  </span>
                </div>
                <p className="text-sm">
                  <strong>Contact:</strong> {lead.contact}
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
                  <strong>Approved:</strong> {lead.approved}
                </p>
              </div>
            ))}

            {filteredLeads.length === 0 && (
              <p className="text-center text-sm text-gray-400 italic">
                No leads found matching your criteria.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedLeads;
