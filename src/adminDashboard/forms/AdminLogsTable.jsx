import { useState } from "react";
import { Eye, X } from "lucide-react";

export default function AdminLogsTable() {
  const [selectedLog, setSelectedLog] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const logs = [
    { 
      id: 1, 
      admin: "Super Admin", 
      action: "Updated Offers #145", 
      timestamp: "2024-10-18 14:32:15", 
      ip: "192.168.1.100", 
      severity: "info",
      details: "Modified Offers title and description. Updated budget from $5,000 to $7,500. Changed Offers status from 'In Progress' to 'Under Review'."
    },
    { 
      id: 2, 
      admin: "Admin Manager", 
      action: "Approved Payment Withdrawal #23", 
      timestamp: "2024-10-18 13:45:22", 
      ip: "192.168.1.101", 
      severity: "success",
      details: "Approved withdrawal request for user John Doe. Amount: $2,500. Bank transfer initiated to account ending in ****1234."
    },
    { 
      id: 3, 
      admin: "Super Admin", 
      action: "Deleted User #789", 
      timestamp: "2024-10-18 12:20:08", 
      ip: "192.168.1.100", 
      severity: "warning",
      details: "Permanently deleted user account for suspicious activity. User: sarah.smith@example.com. All associated data and Offerss have been archived."
    },
    { 
      id: 4, 
      admin: "Content Admin", 
      action: "Added New Category", 
      timestamp: "2024-10-18 11:15:45", 
      ip: "192.168.1.102", 
      severity: "info",
      details: "Created new product category 'Digital Marketing' with 15 subcategories. Updated category hierarchy and permissions."
    },
    { 
      id: 5, 
      admin: "Super Admin", 
      action: "Failed Login Attempt", 
      timestamp: "2024-10-18 10:30:12", 
      ip: "192.168.1.105", 
      severity: "error",
      details: "Multiple failed login attempts detected from IP 192.168.1.105. Account temporarily locked for security. Possible brute force attack."
    },
    { 
      id: 6, 
      admin: "Admin Manager", 
      action: "Reset User Password", 
      timestamp: "2024-10-18 09:45:33", 
      ip: "192.168.1.101", 
      severity: "warning",
      details: "Password reset performed for user mike.johnson@company.com. New temporary password sent via email. User must change on next login."
    },
    { 
      id: 7, 
      admin: "Content Admin", 
      action: "Updated Slide #12", 
      timestamp: "2024-10-18 08:22:19", 
      ip: "192.168.1.102", 
      severity: "info",
      details: "Modified homepage carousel slide. Updated image, title, and call-to-action button. Slide now promotes Q4 campaign."
    },
    { 
      id: 8, 
      admin: "Super Admin", 
      action: "System Backup Completed", 
      timestamp: "2024-10-18 02:00:00", 
      ip: "System", 
      severity: "success",
      details: "Automated daily backup completed successfully. Database size: 2.4GB. Files backed up: 45,678. Backup stored in secure cloud storage."
    },
  ];

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedLog(null);
  };

  const severityColors = {
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Admin Activity Logs</h2>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
          Export Logs
        </button>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Admin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-muted/50">
                <td className="px-6 py-4 text-sm text-foreground whitespace-nowrap">{log.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-foreground whitespace-nowrap">{log.admin}</td>
                <td className="px-6 py-4 text-sm text-foreground whitespace-nowrap">{log.action}</td>
                <td className="px-6 py-4 text-sm text-foreground whitespace-nowrap">{log.timestamp}</td>
                <td className="px-6 py-4 text-sm text-foreground font-mono whitespace-nowrap">{log.ip}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase whitespace-nowrap ${severityColors[log.severity]}`}>
                    {log.severity}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <button
                    onClick={() => handleViewDetails(log)}
                    className="text-white hover:opacity-90 transition-colors px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1"
                    style={{ backgroundColor: '#561ED0' }}
                  >
                    <Eye className="w-3 h-3" />
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="text-white px-6 py-4 flex items-center justify-between" style={{ backgroundColor: '#561ED0' }}>
              <h2 className="text-xl font-semibold">Admin Log Details</h2>
              <button 
                onClick={handleCloseModal}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              {/* Log Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">Log ID</h3>
                    <p className="text-gray-900 font-medium">#{selectedLog.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">Admin</h3>
                    <p className="text-gray-900 font-medium">{selectedLog.admin}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">Action</h3>
                    <p className="text-gray-900">{selectedLog.action}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">Timestamp</h3>
                    <p className="text-gray-900 font-mono text-sm">{selectedLog.timestamp}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">IP Address</h3>
                    <p className="text-gray-900 font-mono text-sm">{selectedLog.ip}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">Severity</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase inline-block ${severityColors[selectedLog.severity]}`}>
                      {selectedLog.severity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Detailed Description</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">{selectedLog.details}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t bg-gray-50 px-6 py-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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
