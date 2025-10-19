import { Download, Search, Filter } from "lucide-react";
import { useState } from "react";

export default function UsersTable({ userType }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const allUsers = {
    active: [
      { id: 1, name: "Rahul Verma", email: "rahul@example.com", phone: "+91 9876543210", role: "Campaign Manager", joinDate: "2024-01-15", projects: 12 },
      { id: 2, name: "Pooja Agarwal", email: "pooja@example.com", phone: "+91 9876543211", role: "Content Writer", joinDate: "2024-02-20", projects: 8 },
      { id: 3, name: "Arjun Kapoor", email: "arjun@example.com", phone: "+91 9876543212", role: "SEO Specialist", joinDate: "2024-03-10", projects: 15 },
      { id: 4, name: "Neha Gupta", email: "neha@example.com", phone: "+91 9876543213", role: "Social Media Manager", joinDate: "2024-04-05", projects: 10 },
    ],
    hold: [
      { id: 5, name: "Sandeep Kumar", email: "sandeep@example.com", phone: "+91 9876543214", role: "Designer", joinDate: "2024-05-12", projects: 5 },
      { id: 6, name: "Meera Singh", email: "meera@example.com", phone: "+91 9876543215", role: "Marketing Executive", joinDate: "2024-06-18", projects: 3 },
    ],
    ex: [
      { id: 7, name: "Karan Malhotra", email: "karan@example.com", phone: "+91 9876543216", role: "Project Manager", joinDate: "2023-08-22", projects: 20 },
      { id: 8, name: "Divya Iyer", email: "divya@example.com", phone: "+91 9876543217", role: "Analyst", joinDate: "2023-09-30", projects: 7 },
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
            <option value="all">All Roles</option>
            <option value="manager">Manager</option>
            <option value="writer">Writer</option>
            <option value="specialist">Specialist</option>
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
          <table className="w-full min-w-[768px]">
          <thead className="bg-muted">
            <tr>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">ID</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Name</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Email</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Phone</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Role</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Join Date</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Projects</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50">
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{user.id}</td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm font-medium text-foreground whitespace-nowrap">{user.name}</td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{user.email}</td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{user.phone}</td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{user.role}</td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{user.joinDate}</td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{user.projects}</td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm whitespace-nowrap">
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
