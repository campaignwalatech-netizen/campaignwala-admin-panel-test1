import { Download, Search, Filter } from "lucide-react";
import { useState } from "react";

export default function LeadsTable({ status }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCampaign, setFilterCampaign] = useState("all");

  const allLeads = {
    pending: [
      { 
        leadId: "LD001", 
        date: "2024-10-15", 
        category: "Digital Marketing", 
        hrName: "Rajesh Kumar", 
        hrContact: "+91 9876543210", 
        customerName: "Amit Enterprises", 
        customerContact: "+91 9876543220", 
        status: "pending" 
      },
      { 
        leadId: "LD002", 
        date: "2024-10-16", 
        category: "SEO Campaign", 
        hrName: "Priya Sharma", 
        hrContact: "+91 9876543211", 
        customerName: "Tech Solutions Ltd", 
        customerContact: "+91 9876543221", 
        status: "pending" 
      },
      { 
        leadId: "LD003", 
        date: "2024-10-17", 
        category: "Social Media", 
        hrName: "Amit Patel", 
        hrContact: "+91 9876543212", 
        customerName: "Fashion Hub", 
        customerContact: "+91 9876543222", 
        status: "pending" 
      },
    ],
    approved: [
      { 
        leadId: "LD004", 
        date: "2024-10-14", 
        category: "Email Marketing", 
        hrName: "Sneha Reddy", 
        hrContact: "+91 9876543213", 
        customerName: "Global Corp", 
        customerContact: "+91 9876543223", 
        status: "approved" 
      },
      { 
        leadId: "LD005", 
        date: "2024-10-13", 
        category: "Content Creation", 
        hrName: "Vikram Singh", 
        hrContact: "+91 9876543214", 
        customerName: "StartUp Inc", 
        customerContact: "+91 9876543224", 
        status: "approved" 
      },
    ],
    completed: [
      { 
        leadId: "LD006", 
        date: "2024-10-10", 
        category: "Brand Awareness", 
        hrName: "Anita Desai", 
        hrContact: "+91 9876543215", 
        customerName: "Retail Chain", 
        customerContact: "+91 9876543225", 
        status: "completed" 
      },
      { 
        leadId: "LD007", 
        date: "2024-10-08", 
        category: "Product Launch", 
        hrName: "Rohit Mehta", 
        hrContact: "+91 9876543216", 
        customerName: "Innovation Labs", 
        customerContact: "+91 9876543226", 
        status: "completed" 
      },
    ],
    rejected: [
      { 
        leadId: "LD008", 
        date: "2024-10-12", 
        category: "SEO Services", 
        hrName: "Kavita Joshi", 
        hrContact: "+91 9876543217", 
        customerName: "Local Business", 
        customerContact: "+91 9876543227", 
        status: "rejected" 
      },
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
          <table className="w-full min-w-[1200px]">
          <thead className="bg-muted">
            <tr>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Date</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Lead ID</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Category</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">HR Name</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">HR Contact</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Customer Name</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Customer Contact</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Status</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-3 sm:px-4 md:px-6 py-6 sm:py-8 text-center text-sm text-muted-foreground">
                  No {status} leads found
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.leadId} className="hover:bg-muted/50">
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{lead.date}</td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm font-medium text-foreground whitespace-nowrap">{lead.leadId}</td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{lead.category}</td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{lead.hrName}</td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{lead.hrContact}</td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{lead.customerName}</td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{lead.customerContact}</td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[lead.status]}`}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm whitespace-nowrap">
                    <button className="text-primary hover:text-primary/80 mr-3 text-sm font-semibold whitespace-nowrap">View</button>
                    <button className="text-primary hover:text-primary/80 text-sm font-semibold whitespace-nowrap">Edit</button>
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
