import { useState } from "react";
import { CheckCircle, XCircle, X, Download, Search, Filter } from "lucide-react";

export default function PaymentWithdrawalTable() {
  const [withdrawals, setWithdrawals] = useState([
    { id: 1, user: "Rahul Verma", amount: "₹25,000", bank: "HDFC Bank - ****4567", date: "2024-10-15", status: "Pending" },
    { id: 2, user: "Priya Sharma", amount: "₹18,500", bank: "ICICI Bank - ****8901", date: "2024-10-16", status: "Approved" },
    { id: 3, user: "Amit Patel", amount: "₹30,000", bank: "SBI - ****2345", date: "2024-10-17", status: "Completed" },
    { id: 4, user: "Sneha Reddy", amount: "₹15,000", bank: "Axis Bank - ****6789", date: "2024-10-18", status: "Pending" },
    { id: 5, user: "Vikram Singh", amount: "₹22,000", bank: "HDFC Bank - ****3456", date: "2024-10-18", status: "Rejected" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [actionType, setActionType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Approved: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  const handleAction = (withdrawal, action) => {
    setSelectedWithdrawal(withdrawal);
    setActionType(action);
    setShowModal(true);
  };

  const confirmAction = () => {
    if (actionType === "approve") {
      setWithdrawals(withdrawals.map(w => 
        w.id === selectedWithdrawal.id ? {...w, status: "Approved"} : w
      ));
    } else {
      setWithdrawals(withdrawals.map(w => 
        w.id === selectedWithdrawal.id ? {...w, status: "Rejected"} : w
      ));
    }
    setShowModal(false);
    setSelectedWithdrawal(null);
  };

  const totalPending = withdrawals
    .filter(w => w.status === 'Pending')
    .reduce((sum, w) => sum + parseInt(w.amount.replace(/[₹,]/g, '')), 0);

  const handleExport = () => {
    console.log("Exporting withdrawals...");
    alert("Export functionality will be implemented soon!");
  };

  return (
    <div className="h-full flex flex-col p-3 sm:p-4">
      {/* Header with Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground whitespace-nowrap">Payment Withdrawal List</h2>
        <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                    <strong>Total Pending:</strong> ₹{totalPending.toLocaleString()}
        </div>
      </div>

      {/* Filters and Export in one line */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search withdrawals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-9 pr-8 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
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
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">User Name</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Amount</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Bank Account</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Date</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Status</th>
              <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {withdrawals.map((withdrawal) => (
              <tr key={withdrawal.id} className="hover:bg-muted/50">
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{withdrawal.id}</td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm font-medium text-foreground whitespace-nowrap">{withdrawal.user}</td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm font-bold text-foreground whitespace-nowrap">{withdrawal.amount}</td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{withdrawal.bank}</td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm text-foreground whitespace-nowrap">{withdrawal.date}</td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusColors[withdrawal.status]}`}>
                    {withdrawal.status}
                  </span>
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm whitespace-nowrap">
                  {withdrawal.status === 'Pending' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(withdrawal, "approve")}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-semibold inline-flex items-center gap-1 whitespace-nowrap"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(withdrawal, "reject")}
                        className="px-3 py-1 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 text-xs font-semibold inline-flex items-center gap-1 whitespace-nowrap"
                      >
                        <XCircle className="w-3 h-3" />
                        Reject
                      </button>
                    </div>
                  ) : (
                    <button className="text-primary hover:text-primary/80 font-semibold text-xs whitespace-nowrap">View Details</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base sm:text-lg font-bold text-foreground whitespace-nowrap">
                Confirm {actionType === "approve" ? "Approval" : "Rejection"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-foreground mb-6 break-words">
              Are you sure you want to {actionType} withdrawal of <strong>{selectedWithdrawal?.amount}</strong> for <strong>{selectedWithdrawal?.user}</strong>?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={confirmAction} 
                className={`flex-1 px-4 py-2 text-sm rounded-lg whitespace-nowrap ${
                  actionType === "approve" 
                    ? "bg-green-600 text-white hover:bg-green-700" 
                    : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                }`}
              >
                {actionType === "approve" ? "Approve" : "Reject"}
              </button>
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-muted text-foreground text-sm rounded-lg hover:bg-muted/80 whitespace-nowrap">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
