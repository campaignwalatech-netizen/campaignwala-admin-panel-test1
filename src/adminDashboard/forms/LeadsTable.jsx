import { Download, Search, Filter } from "lucide-react";
import { useState } from "react";

export default function LeadsTable({ status }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCampaign, setFilterCampaign] = useState("all");

  const allLeads = {
    pending: [
      { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", phone: "+91 9876543210", campaign: "Digital Marketing", date: "2024-10-15" },
      { id: 2, name: "Priya Sharma", email: "priya@example.com", phone: "+91 9876543211", campaign: "SEO Campaign", date: "2024-10-16" },
      { id: 3, name: "Amit Patel", email: "amit@example.com", phone: "+91 9876543212", campaign: "Social Media", date: "2024-10-17" },
    ],
    approved: [
      { id: 4, name: "Sneha Reddy", email: "sneha@example.com", phone: "+91 9876543213", campaign: "Email Marketing", date: "2024-10-14" },
      { id: 5, name: "Vikram Singh", email: "vikram@example.com", phone: "+91 9876543214", campaign: "Content Creation", date: "2024-10-13" },
    ],
    completed: [
      { id: 6, name: "Anita Desai", email: "anita@example.com", phone: "+91 9876543215", campaign: "Brand Awareness", date: "2024-10-10" },
      { id: 7, name: "Rohit Mehta", email: "rohit@example.com", phone: "+91 9876543216", campaign: "Product Launch", date: "2024-10-08" },
    ],
    rejected: [
      { id: 8, name: "Kavita Joshi", email: "kavita@example.com", phone: "+91 9876543217", campaign: "SEO Services", date: "2024-10-12" },
    ],
  };

  const leads = allLeads[status] || [];
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    approved: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  const handleExport = () => {
    console.log("Exporting leads...");
    alert("Export functionality will be implemented soon!");
  };

  return (
    <div className="h-full flex flex-col p-3 sm:p-4">
      {/* Header with Title */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground capitalize whitespace-nowrap">{status} Leads</h2>
        <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${statusColors[status]}`}>
          {leads.length} Total
        </span>
      </div>

      {/* Filters and Export in one line */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <select
            value={filterCampaign}
            onChange={(e) => setFilterCampaign(e.target.value)}
            className="pl-9 pr-8 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="all">All Campaigns</option>
            <option value="marketing">Marketing</option>
            <option value="seo">SEO</option>
            <option value="social">Social Media</option>
          </select>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Table with fixed height */}
      <div className="flex-1 bg-card rounded-lg border border-border overflow-hidden flex flex-col min-h-0">
        <div className="overflow-x-auto scrollbar-custom flex-1">
          <table className="w-full min-w-[640px]">
          <thead className="bg-muted">
            <tr>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">ID</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Name</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Email</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Phone</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Campaign</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Date</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 sm:px-4 md:px-6 py-6 sm:py-8 text-center text-sm text-muted-foreground">
                  No {status} leads found
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-muted/50">
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{lead.id}</td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm font-medium text-foreground whitespace-nowrap">{lead.name}</td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{lead.email}</td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{lead.phone}</td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{lead.campaign}</td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{lead.date}</td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm whitespace-nowrap">
                    <button className="text-primary hover:text-primary/80 mr-3 text-sm font-semibold whitespace-nowrap">View</button>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold whitespace-nowrap">Edit</button>
                </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
