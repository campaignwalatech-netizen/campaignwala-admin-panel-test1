import { useState } from "react";
import { CheckCircle, XCircle, X, Download, Search, Filter, ChevronDown, Info } from "lucide-react";

export default function PaymentWithdrawalTable() {
  const [withdrawals, setWithdrawals] = useState([
    { 
      leadId: "LID001", 
      leadName: "Alice Johnson", 
      category: "Electronics", 
      dateRequested: "2024-07-20", 
      amount: 800.00, 
      status: "Approved",
      details: "TXN: TXNQ23458"
    },
    { 
      leadId: "LID002", 
      leadName: "Bob Williams", 
      category: "Apparel", 
      dateRequested: "2024-07-19", 
      amount: 120.50, 
      status: "Pending",
      details: "N/A"
    },
    { 
      leadId: "LID003", 
      leadName: "Charlie Brown", 
      category: "Home Goods", 
      dateRequested: "2024-07-18", 
      amount: 75.00, 
      status: "Rejected",
      details: "Insufficient funds"
    },
    { 
      leadId: "LID004", 
      leadName: "Diana Miller", 
      category: "Electronics", 
      dateRequested: "2024-07-17", 
      amount: 300.00, 
      status: "Approved",
      details: "TXN: TXNB54321"
    },
    { 
      leadId: "LID005", 
      leadName: "Eve Davis", 
      category: "Automotive", 
      dateRequested: "2024-07-16", 
      amount: 9000.00, 
      status: "Pending",
      details: "N/A"
    },
    { 
      leadId: "LID006", 
      leadName: "Frank Green", 
      category: "Apparel", 
      dateRequested: "2024-07-15", 
      amount: 45.25, 
      status: "Approved",
      details: "TXN: TXN789012"
    },
    { 
      leadId: "LID007", 
      leadName: "Grace Hall", 
      category: "Home Goods", 
      dateRequested: "2024-07-14", 
      amount: 150.00, 
      status: "Rejected",
      details: "Policy violation"
    },
    { 
      leadId: "LID008", 
      leadName: "Harry White", 
      category: "Electronics", 
      dateRequested: "2024-07-13", 
      amount: 250.00, 
      status: "Approved",
      details: "TXN: TXN456878"
    },
    { 
      leadId: "LID009", 
      leadName: "Ivy Black", 
      category: "Automotive", 
      dateRequested: "2024-07-12", 
      amount: 600.00, 
      status: "Pending",
      details: "N/A"
    },
    { 
      leadId: "LID010", 
      leadName: "Jack Taylor", 
      category: "Apparel", 
      dateRequested: "2024-07-11", 
      amount: 88.75, 
      status: "Approved",
      details: "TXN: TXNRQ1234"
    },
    { 
      leadId: "LID011", 
      leadName: "Kelly Smith", 
      category: "Electronics", 
      dateRequested: "2024-07-10", 
      amount: 450.00, 
      status: "Pending",
      details: "N/A"
    },
    { 
      leadId: "LID012", 
      leadName: "Liam Anderson", 
      category: "Sports", 
      dateRequested: "2024-07-09", 
      amount: 320.75, 
      status: "Approved",
      details: "TXN: TXN987654"
    },
    { 
      leadId: "LID013", 
      leadName: "Maya Rodriguez", 
      category: "Beauty", 
      dateRequested: "2024-07-08", 
      amount: 95.50, 
      status: "Rejected",
      details: "Duplicate request"
    },
    { 
      leadId: "LID014", 
      leadName: "Noah Wilson", 
      category: "Automotive", 
      dateRequested: "2024-07-07", 
      amount: 1200.00, 
      status: "Approved",
      details: "TXN: TXN123987"
    },
    { 
      leadId: "LID015", 
      leadName: "Olivia Garcia", 
      category: "Home Goods", 
      dateRequested: "2024-07-06", 
      amount: 185.25, 
      status: "Pending",
      details: "N/A"
    },
    { 
      leadId: "LID016", 
      leadName: "Paul Martinez", 
      category: "Electronics", 
      dateRequested: "2024-07-05", 
      amount: 675.00, 
      status: "Approved",
      details: "TXN: TXN456123"
    },
    { 
      leadId: "LID017", 
      leadName: "Quinn Thompson", 
      category: "Apparel", 
      dateRequested: "2024-07-04", 
      amount: 225.80, 
      status: "Rejected",
      details: "Account verification failed"
    },
    { 
      leadId: "LID018", 
      leadName: "Rachel Davis", 
      category: "Books", 
      dateRequested: "2024-07-03", 
      amount: 65.00, 
      status: "Approved",
      details: "TXN: TXN789456"
    },
    { 
      leadId: "LID019", 
      leadName: "Sam Johnson", 
      category: "Sports", 
      dateRequested: "2024-07-02", 
      amount: 890.00, 
      status: "Pending",
      details: "N/A"
    },
    { 
      leadId: "LID020", 
      leadName: "Tina Brown", 
      category: "Beauty", 
      dateRequested: "2024-07-01", 
      amount: 155.75, 
      status: "Approved",
      details: "TXN: TXN321654"
    },
    { 
      leadId: "LID021", 
      leadName: "Uma Patel", 
      category: "Electronics", 
      dateRequested: "2024-06-30", 
      amount: 1450.00, 
      status: "Rejected",
      details: "Exceeds limit"
    },
    { 
      leadId: "LID022", 
      leadName: "Victor Lee", 
      category: "Automotive", 
      dateRequested: "2024-06-29", 
      amount: 2100.50, 
      status: "Pending",
      details: "N/A"
    },
    { 
      leadId: "LID023", 
      leadName: "Wendy Clark", 
      category: "Home Goods", 
      dateRequested: "2024-06-28", 
      amount: 340.25, 
      status: "Approved",
      details: "TXN: TXN654987"
    },
    { 
      leadId: "LID024", 
      leadName: "Xavier Kim", 
      category: "Sports", 
      dateRequested: "2024-06-27", 
      amount: 725.00, 
      status: "Approved",
      details: "TXN: TXN852741"
    },
    { 
      leadId: "LID025", 
      leadName: "Yara Singh", 
      category: "Books", 
      dateRequested: "2024-06-26", 
      amount: 45.90, 
      status: "Rejected",
      details: "Invalid documentation"
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [actionType, setActionType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Statuses");

  const statusColors = {
    Pending: "bg-yellow-50 text-yellow-600 border-yellow-200",
    Approved: "bg-green-50 text-green-600 border-green-200",
    Rejected: "bg-red-50 text-red-600 border-red-200",
  };

  const handleAction = (withdrawal, action) => {
    setSelectedWithdrawal(withdrawal);
    setActionType(action);
    setShowModal(true);
  };

  const confirmAction = () => {
    if (actionType === "approve") {
      setWithdrawals(withdrawals.map(w => 
        w.leadId === selectedWithdrawal.leadId ? {...w, status: "Approved"} : w
      ));
    } else {
      setWithdrawals(withdrawals.map(w => 
        w.leadId === selectedWithdrawal.leadId ? {...w, status: "Rejected"} : w
      ));
    }
    setShowModal(false);
    setSelectedWithdrawal(null);
  };

  // Calculate statistics
  const totalRequests = withdrawals.length;
  const approvedRequests = withdrawals.filter(w => w.status === 'Approved').length;
  const pendingRequests = withdrawals.filter(w => w.status === 'Pending').length;
  const rejectedRequests = withdrawals.filter(w => w.status === 'Rejected').length;

  const handleExport = () => {
    console.log("Exporting withdrawal data...");
    alert("Export functionality will be implemented soon!");
  };

  return (
    <div className="h-full flex flex-col p-3 sm:p-4 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-foreground">Payment Withdrawal Requests</h1>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <div className="bg-card rounded-lg border border-border p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Requests</p>
              <p className="text-2xl font-bold text-foreground">{totalRequests}</p>
              <p className="text-xs text-muted-foreground">Overall count of all withdrawal requests</p>
            </div>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="bg-card rounded-lg border border-border p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Approved Requests</p>
              <p className="text-2xl font-bold text-foreground">{approvedRequests}</p>
              <p className="text-xs text-muted-foreground">Requests successfully processed and approved</p>
            </div>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="bg-card rounded-lg border border-border p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending Requests</p>
              <p className="text-2xl font-bold text-foreground">{pendingRequests}</p>
              <p className="text-xs text-muted-foreground">Requests awaiting review or processing</p>
            </div>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="bg-card rounded-lg border border-border p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Denied Requests</p>
              <p className="text-2xl font-bold text-foreground">{rejectedRequests}</p>
              <p className="text-xs text-muted-foreground">Requests that were rejected or cancelled</p>
            </div>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-foreground mb-3">Filter Requests</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by Lead ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none bg-background border border-border rounded-lg px-4 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 bg-card rounded-lg border border-border overflow-hidden">
        <div className="max-h-96 overflow-y-auto overflow-x-auto scrollbar-hide">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">LEAD ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">LEAD NAME</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">CATEGORY</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">DATE REQUESTED</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">AMOUNT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">STATUS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">DETAILS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal.leadId} className="hover:bg-muted/20">
                  <td className="px-6 py-4 text-sm text-foreground">{withdrawal.leadId}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{withdrawal.leadName}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{withdrawal.category}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{withdrawal.dateRequested}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">${withdrawal.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${statusColors[withdrawal.status]}`}>
                      {withdrawal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{withdrawal.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="border-t border-border px-6 py-3 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground border border-border rounded">
                ← Previous
              </button>
              <span className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded">1</span>
              <span className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground cursor-pointer">2</span>
              <button className="px-3 py-1 text-sm text-primary hover:text-primary/80">
                Next →
              </button>
            </div>
          </div>
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
              Are you sure you want to {actionType} withdrawal request for <strong>{selectedWithdrawal?.leadName}</strong> with amount <strong>${selectedWithdrawal?.amount}</strong>?
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
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground text-sm rounded-lg hover:bg-destructive/80 whitespace-nowrap">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
