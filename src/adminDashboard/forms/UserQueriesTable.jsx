import { useState } from "react";
import { X, CheckCircle, Mail, User, Calendar, AlertCircle } from "lucide-react";

export default function UserQueriesTable() {
  const [queries, setQueries] = useState([
    { id: 1, user: "Rajesh Kumar", email: "rajesh@example.com", subject: "Payment Issue", message: "Unable to process payment for campaign", date: "2024-10-18", status: "Open", priority: "High" },
    { id: 2, user: "Priya Sharma", email: "priya@example.com", subject: "Campaign Not Showing", message: "My campaign is not appearing on the dashboard", date: "2024-10-18", status: "In Progress", priority: "Medium" },
    { id: 3, user: "Amit Patel", email: "amit@example.com", subject: "Account Verification", message: "Need help with account verification process", date: "2024-10-17", status: "Resolved", priority: "Low" },
    { id: 4, user: "Sneha Reddy", email: "sneha@example.com", subject: "Feature Request", message: "Would like to request bulk upload feature", date: "2024-10-17", status: "Open", priority: "Low" },
    { id: 5, user: "Vikram Singh", email: "vikram@example.com", subject: "Login Problem", message: "Cannot login to my account", date: "2024-10-16", status: "Resolved", priority: "High" },
  ]);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const statusColors = {
    Open: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Resolved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  const priorityColors = {
    High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    Medium: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    Low: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  };

  const handleViewDetails = (query) => {
    setSelectedQuery(query);
    setShowDetailsModal(true);
  };

  const handleStatusChange = (newStatus) => {
    setQueries(queries.map(q => 
      q.id === selectedQuery.id ? {...q, status: newStatus} : q
    ));
    setShowDetailsModal(false);
    setAlertMessage(`Query status updated to "${newStatus}"`);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  return (
    <div className="p-6">
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold whitespace-nowrap">{alertMessage}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground whitespace-nowrap">User Queries</h2>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-sm font-semibold whitespace-nowrap">
            {queries.filter(q => q.status === 'Open').length} Open
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-semibold whitespace-nowrap">
            {queries.filter(q => q.status === 'In Progress').length} In Progress
          </span>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {queries.map((query) => (
              <tr key={query.id} className="hover:bg-muted/50">
                <td className="px-6 py-4 text-sm text-foreground whitespace-nowrap">{query.id}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <div className="font-medium text-foreground whitespace-nowrap">{query.user}</div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">{query.email}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground whitespace-nowrap">{query.subject}</td>
                <td className="px-6 py-4 text-sm text-foreground max-w-xs truncate">{query.message}</td>
                <td className="px-6 py-4 text-sm text-foreground whitespace-nowrap">{query.date}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${priorityColors[query.priority]}`}>
                    {query.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusColors[query.status]}`}>
                    {query.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <button 
                    onClick={() => handleViewDetails(query)}
                    className="text-primary hover:text-primary/80 font-semibold whitespace-nowrap"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      {showDetailsModal && selectedQuery && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground whitespace-nowrap">Query Details</h3>
              <button onClick={() => setShowDetailsModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* User Info */}
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground whitespace-nowrap">User Name</p>
                      <p className="font-semibold text-foreground whitespace-nowrap">{selectedQuery.user}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground whitespace-nowrap">Email</p>
                      <p className="font-semibold text-foreground whitespace-nowrap">{selectedQuery.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground whitespace-nowrap">Date</p>
                      <p className="font-semibold text-foreground whitespace-nowrap">{selectedQuery.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground whitespace-nowrap">Priority</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap inline-block ${priorityColors[selectedQuery.priority]}`}>
                        {selectedQuery.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Query Details */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 whitespace-nowrap">Subject</label>
                <p className="text-foreground bg-muted/30 p-3 rounded-lg">{selectedQuery.subject}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 whitespace-nowrap">Message</label>
                <p className="text-foreground bg-muted/30 p-3 rounded-lg">{selectedQuery.message}</p>
              </div>

              {/* Current Status */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2 whitespace-nowrap">Current Status</label>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap inline-block ${statusColors[selectedQuery.status]}`}>
                  {selectedQuery.status}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-border">
                <label className="block text-sm font-semibold text-foreground mb-3 whitespace-nowrap">Update Status</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleStatusChange("In Progress")}
                    disabled={selectedQuery.status === "In Progress"}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Mark In Progress
                  </button>
                  <button
                    onClick={() => handleStatusChange("Resolved")}
                    disabled={selectedQuery.status === "Resolved"}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Mark Resolved
                  </button>
                  <button
                    onClick={() => handleStatusChange("Open")}
                    disabled={selectedQuery.status === "Open"}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-semibold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reopen
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
