import { Download, Search, Filter, X } from "lucide-react";
import { useState } from "react";

export default function UsersTable({ userType }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [userStatuses, setUserStatuses] = useState({});
  const [hoveredUser, setHoveredUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
        currentBalance: "₹0"
      },
    ],
  };

  // Filter users based on search term and filter criteria
  const filteredUsers = (allUsers[userType] || []).filter(user => {
    const matchesSearch = searchTerm === "" || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesFilter = filterRole === "all" || 
      (filterRole === "high_leads" && user.totalLeads > 30) ||
      (filterRole === "moderate_leads" && user.totalLeads >= 10 && user.totalLeads <= 30) ||
      (filterRole === "low_leads" && user.totalLeads < 10);
    
    return matchesSearch && matchesFilter;
  });

  const users = filteredUsers;

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

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleActivateUser = (userId) => {
    console.log(`Activating user with ID: ${userId}`);
    // Update local state to show user as active
    setUserStatuses(prev => ({
      ...prev,
      [userId]: 'Active'
    }));
    setHoveredUser(null); // Close dropdown
    alert(`User ${userId} has been activated successfully!`);
  };

  const handleDeactivateUser = (userId) => {
    console.log(`Putting user on hold with ID: ${userId}`);
    // Update local state to show user as hold
    setUserStatuses(prev => ({
      ...prev,
      [userId]: 'Hold'
    }));
    setHoveredUser(null); // Close dropdown
    alert(`User ${userId} has been put on hold!`);
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
            <option value="all">All Users</option>
            <option value="high_leads">High Leads (&gt;30)</option>
            <option value="moderate_leads">Moderate Leads (10-30)</option>
            <option value="low_leads">Low Leads (&lt;10)</option>
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
              <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Total Earnings</th>
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
                <td className="px-3 py-3 text-sm whitespace-nowrap relative">
                  {(() => {
                    // Check if user status has been updated locally
                    const currentStatus = userStatuses[user.id] || user.status;
                    const isHovered = hoveredUser === user.id;
                    
                    return (
                      <div className="relative inline-block">
                        <div
                          onMouseEnter={() => setHoveredUser(user.id)}
                          onMouseLeave={() => setHoveredUser(null)}
                          className="relative"
                        >
                          {!isHovered ? (
                            // Show normal status badge when not hovered
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                              currentStatus === 'Active' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                              currentStatus === 'Hold' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                            }`}>
                              {currentStatus}
                            </span>
                          ) : (
                            // Show connected options when hovered
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden">
                              {/* Current Status */}
                              <div className={`px-2 py-1 text-xs font-semibold cursor-pointer transition-colors text-center ${
                                currentStatus === 'Active' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              }`}>
                                {currentStatus}
                              </div>
                              
                              {/* Separator line */}
                              <div className="border-t border-gray-200 dark:border-gray-600"></div>
                              
                              {/* Alternative Status */}
                              <button
                                onClick={() => currentStatus === 'Active' ? handleDeactivateUser(user.id) : handleActivateUser(user.id)}
                                className={`w-full px-2 py-1 text-xs font-semibold cursor-pointer transition-colors text-center ${
                                  currentStatus === 'Active' 
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:bg-yellow-200' 
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 hover:bg-red-200'
                                }`}
                              >
                                {currentStatus === 'Active' ? 'Hold' : 'Active'}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </td>
                <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap font-semibold">{user.totalLeads}</td>
                <td className="px-3 py-3 text-sm text-green-600 whitespace-nowrap font-semibold">{user.approved}</td>
                <td className="px-3 py-3 text-sm text-red-600 whitespace-nowrap font-semibold">{user.rejected}</td>
                <td className="px-3 py-3 text-sm text-blue-600 whitespace-nowrap font-semibold">{user.completed}</td>
                <td className="px-3 py-3 text-sm text-orange-600 whitespace-nowrap font-semibold">{user.pending}</td>
                <td className="px-3 py-3 text-sm text-foreground whitespace-nowrap font-semibold text-green-600">{user.currentBalance}</td>
                <td className="px-3 py-3 text-sm whitespace-nowrap">
                  <button 
                    onClick={() => handleViewUser(user)}
                    className="text-primary hover:text-primary/80 mr-3 text-sm font-semibold whitespace-nowrap"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleEditUser(user)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-semibold whitespace-nowrap"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground">View User Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                <p className="text-sm text-muted-foreground">{selectedUser.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                <p className="text-sm text-muted-foreground">{selectedUser.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                <p className="text-sm text-muted-foreground">{selectedUser.status}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Joined On</label>
                <p className="text-sm text-muted-foreground">{selectedUser.joinedOn}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Total Leads</label>
                <p className="text-sm font-semibold text-foreground">{selectedUser.totalLeads}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Approved</label>
                <p className="text-sm font-semibold text-green-600">{selectedUser.approved}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Total Earnings</label>
                <p className="text-sm font-semibold text-green-600">{selectedUser.currentBalance}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground">Edit User</h3>
              <button onClick={() => setShowEditModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  type="text"
                  defaultValue={selectedUser.name}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={selectedUser.email}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input
                  type="text"
                  defaultValue={selectedUser.phone}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select
                  defaultValue={selectedUser.status}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Active">Active</option>
                  <option value="Hold">Hold</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  alert("User updated successfully!");
                }}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
