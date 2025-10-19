export default function AdminLogsTable() {
  const logs = [
    { id: 1, admin: "Super Admin", action: "Updated Project #145", timestamp: "2024-10-18 14:32:15", ip: "192.168.1.100", severity: "info" },
    { id: 2, admin: "Admin Manager", action: "Approved Payment Withdrawal #23", timestamp: "2024-10-18 13:45:22", ip: "192.168.1.101", severity: "success" },
    { id: 3, admin: "Super Admin", action: "Deleted User #789", timestamp: "2024-10-18 12:20:08", ip: "192.168.1.100", severity: "warning" },
    { id: 4, admin: "Content Admin", action: "Added New Category", timestamp: "2024-10-18 11:15:45", ip: "192.168.1.102", severity: "info" },
    { id: 5, admin: "Super Admin", action: "Failed Login Attempt", timestamp: "2024-10-18 10:30:12", ip: "192.168.1.105", severity: "error" },
    { id: 6, admin: "Admin Manager", action: "Reset User Password", timestamp: "2024-10-18 09:45:33", ip: "192.168.1.101", severity: "warning" },
    { id: 7, admin: "Content Admin", action: "Updated Slide #12", timestamp: "2024-10-18 08:22:19", ip: "192.168.1.102", severity: "info" },
    { id: 8, admin: "Super Admin", action: "System Backup Completed", timestamp: "2024-10-18 02:00:00", ip: "System", severity: "success" },
  ];

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
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Admin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Severity</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
