import { Download, Search, Filter } from "lucide-react";
import { useState } from "react";

export default function UsersTable({ userType }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const allUsers = {
    active: [
      { 
        id: 1, 
        name: "Rahul Verma", 
        email: "rahul@example.com", 
        phone: "+91 9876543210", 
        status: "Active",
        joinedOn: "2024-01-15",
        totalLeads: 45,
        approved: 32,
        rejected: 5,
        completed: 28,
        pending: 12,
        accountNumber: "ACC001234",
        category: "Marketing",
        currentBalance: "₹15,450"
      },
      { 
        id: 2, 
        name: "Pooja Agarwal", 
        email: "pooja@example.com", 
        phone: "+91 9876543211", 
        status: "Active",
        joinedOn: "2024-02-20",
        totalLeads: 38,
        approved: 25,
        rejected: 8,
        completed: 22,
        pending: 8,
        accountNumber: "ACC001235",
        category: "Content",
        currentBalance: "₹12,300"
      },
      { 
        id: 3, 
        name: "Arjun Kapoor", 
        email: "arjun@example.com", 
        phone: "+91 9876543212", 
        status: "Active",
        joinedOn: "2024-03-10",
        totalLeads: 52,
        approved: 41,
        rejected: 3,
        completed: 35,
        pending: 14,
        accountNumber: "ACC001236",
        category: "SEO",
        currentBalance: "₹18,750"
      },
      { 
        id: 4, 
        name: "Neha Gupta", 
        email: "neha@example.com", 
        phone: "+91 9876543213", 
        status: "Active",
        joinedOn: "2024-04-05",
        totalLeads: 29,
        approved: 20,
        rejected: 4,
        completed: 18,
        pending: 7,
        accountNumber: "ACC001237",
        category: "Social Media",
        currentBalance: "₹9,850"
      },
    ],
    hold: [
      { 
        id: 5, 
        name: "Sandeep Kumar", 
        email: "sandeep@example.com", 
        phone: "+91 9876543214", 
        status: "Hold",
        joinedOn: "2024-05-12",
        totalLeads: 15,
        approved: 8,
        rejected: 2,
        completed: 6,
        pending: 5,
        accountNumber: "ACC001238",
        category: "Design",
        currentBalance: "₹4,200"
      },
      { 
        id: 6, 
        name: "Meera Singh", 
        email: "meera@example.com", 
        phone: "+91 9876543215", 
        status: "Hold",
        joinedOn: "2024-06-18",
        totalLeads: 12,
        approved: 5,
        rejected: 3,
        completed: 4,
        pending: 4,
        accountNumber: "ACC001239",
        category: "Marketing",
        currentBalance: "₹2,800"
      },
    ],
    ex: [
      { 
        id: 7, 
        name: "Karan Malhotra", 
        email: "karan@example.com", 
        phone: "+91 9876543216", 
        status: "Ex",
        joinedOn: "2023-08-22",
        totalLeads: 89,
        approved: 65,
        rejected: 12,
        completed: 58,
        pending: 0,
        accountNumber: "ACC001240",
        category: "Project Management",
        currentBalance: "₹0"
      },
      { 
        id: 8, 
        name: "Divya Iyer", 
        email: "divya@example.com", 
        phone: "+91 9876543217", 
        status: "Ex",
        joinedOn: "2023-09-30",
        totalLeads: 34,
        approved: 22,
        rejected: 7,
        completed: 20,
        pending: 0,
        accountNumber: "ACC001241",
        category: "Analytics",
        currentBalance: "₹0"
      },
    ],
  };

  const users = allUsers[userType] || [];
  const statusColors = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    hold: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    ex: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  };

  const statusLabels = {
    active: "Active Users",
    hold: "On Hold Users",
    ex: "Ex Users",
  };

  const handleExport = () => {
    console.log("Exporting users...");
    alert("Export functionality will be implemented soon!");
  };

  return (
    <div className="h-full flex flex-col p-3 sm:p-4">
      {/* Header with Title */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground whitespace-nowrap">{statusLabels[userType]}</h2>
        <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${statusColors[userType]}`}>
          {users.length} Total
        </span>
      </div>

      {/* Filters and Export in one line */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="pl-9 pr-8 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="marketing">Marketing</option>
            <option value="content">Content</option>
            <option value="seo">SEO</option>
            <option value="social">Social Media</option>
            <option value="design">Design</option>
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
          <table className="w-full min-w-[1400px]">
          <thead className="bg-muted">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Joined On</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Name</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Phone Number</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Email</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Status</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Total Leads</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Approved</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Rejected</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Completed</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Pending</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Account Number</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Category</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Current Balance</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50">
                <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">{user.joinedOn}</td>
                <td className="px-3 py-3 text-sm font-medium text-foreground whitespace-nowrap">{user.name}</td>
                <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">{user.phone}</td>
                <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">{user.email}</td>
                <td className="px-3 py-3 text-sm whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    user.status === 'Hold' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap font-semibold">{user.totalLeads}</td>
                <td className="px-3 py-3 text-sm text-green-600 whitespace-nowrap font-semibold">{user.approved}</td>
                <td className="px-3 py-3 text-sm text-red-600 whitespace-nowrap font-semibold">{user.rejected}</td>
                <td className="px-3 py-3 text-sm text-blue-600 whitespace-nowrap font-semibold">{user.completed}</td>
                <td className="px-3 py-3 text-sm text-orange-600 whitespace-nowrap font-semibold">{user.pending}</td>
                <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap font-mono">{user.accountNumber}</td>
                <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md text-xs font-medium">
                    {user.category}
                  </span>
                </td>
                <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap font-semibold text-green-600">{user.currentBalance}</td>
                <td className="px-3 py-3 text-sm whitespace-nowrap">
                  <button className="text-primary hover:text-primary/80 mr-3 text-sm font-semibold whitespace-nowrap">View</button>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold whitespace-nowrap">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
