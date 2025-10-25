import { useState } from "react";
import { Search, User, CreditCard, MapPin, Building, CheckCircle, XCircle, ArrowLeft, Eye } from "lucide-react";

export default function KYCReview() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentView, setCurrentView] = useState("table"); // "table" or "details"
  const [actionType, setActionType] = useState(""); // "approve" or "reject"

  // Mock KYC users data
  const [kycUsers] = useState([
    {
      userId: "USER00123",
      fullName: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      phone: "+91 98765 43210",
      gender: "Male",
      address: "921 Broadway",
      zipCode: "79901",
      panNumber: "ABCDE1234F",
      aadhaarNumber: "1234 5678 9012",
      accountNumber: "XXXXXXXXXX7890",
      ifscCode: "HDFC0001234",
      bankName: "HDFC Bank",
      branchAddress: "HDFC Bank, Jasola Vihar, New Delhi",
      submittedDate: "2024-10-20",
      status: "Pending"
    },
    {
      userId: "USER00124", 
      fullName: "Priya Patel",
      email: "priya.patel@example.com",
      phone: "+91 87654 32109",
      gender: "Female",
      address: "456 MG Road",
      zipCode: "400001",
      panNumber: "FGHIJ5678K",
      aadhaarNumber: "9876 5432 1098",
      accountNumber: "XXXXXXXXXX1234",
      ifscCode: "SBIN0001234",
      bankName: "State Bank of India",
      branchAddress: "SBI Main Branch, Mumbai",
      submittedDate: "2024-10-18",
      status: "Pending"
    },
    {
      userId: "USER00125",
      fullName: "Rohit Kumar", 
      email: "rohit.kumar@example.com",
      phone: "+91 76543 21098",
      gender: "Male",
      address: "789 Park Street",
      zipCode: "560001",
      panNumber: "KLMNO9012P",
      aadhaarNumber: "5678 9012 3456",
      accountNumber: "XXXXXXXXXX5678",
      ifscCode: "ICIC0001234",
      bankName: "ICICI Bank",
      branchAddress: "ICICI Bank, Brigade Road, Bangalore",
      submittedDate: "2024-10-22",
      status: "Pending"
    },
    {
      userId: "USER00126",
      fullName: "Sneha Gupta",
      email: "sneha.gupta@example.com", 
      phone: "+91 65432 10987",
      gender: "Female",
      address: "321 Civil Lines",
      zipCode: "110001",
      panNumber: "QRSTU3456V",
      aadhaarNumber: "2345 6789 0123",
      accountNumber: "XXXXXXXXXX9012",
      ifscCode: "AXIS0001234", 
      bankName: "Axis Bank",
      branchAddress: "Axis Bank, Connaught Place, Delhi",
      submittedDate: "2024-10-19",
      status: "Pending"
    }
  ]);

  // Filter users based on search
  const filteredUsers = kycUsers.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setCurrentView("details");
  };

  const handleBackToTable = () => {
    setCurrentView("table");
    setSelectedUser(null);
    setActionType("");
  };

  const handleApprove = () => {
    console.log("KYC Approved for:", selectedUser.fullName);
    alert(`KYC approved for ${selectedUser.fullName}`);
    handleBackToTable();
  };

  const handleReject = () => {
    const reason = prompt("Please enter reason for rejection:");
    if (reason) {
      console.log("KYC Rejected for:", selectedUser.fullName, "Reason:", reason);
      alert(`KYC rejected for ${selectedUser.fullName}`);
      handleBackToTable();
    }
  };

  return (
    <div className="h-full flex flex-col p-3 sm:p-4 bg-background">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {currentView === "details" && (
              <button
                onClick={handleBackToTable}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-semibold">
                K
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              {currentView === "table" 
                ? "KYC Review - Pending Applications" 
                : `KYC ${actionType === "approve" ? "Approval" : "Rejection"} - ${selectedUser?.fullName}`
              }
            </h1>
          </div>
        </div>

        {/* Search - Only show in table view */}
        {currentView === "table" && (
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {currentView === "table" ? (
          // Table View - List of KYC Applications
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">
                Pending KYC Applications ({filteredUsers.length})
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px] table-fixed">
                <colgroup>
                  <col className="w-24" />
                  <col className="w-40" />
                  <col className="w-56" />
                  <col className="w-32" />
                  <col className="w-28" />
                  <col className="w-24" />
                  <col className="w-72" />
                </colgroup>
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.map((user) => (
                    <tr key={user.userId} className="hover:bg-muted/50">
                      <td className="px-4 py-4 text-sm font-medium text-foreground whitespace-nowrap">
                        {user.userId}
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground whitespace-nowrap">
                        {user.fullName}
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground truncate" title={user.email}>
                        {user.email}
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground whitespace-nowrap">
                        {user.phone}
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground whitespace-nowrap">
                        {user.submittedDate}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 whitespace-nowrap">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <button
                            onClick={() => handleViewDetails(user, "approve")}
                            className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-xs font-medium"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleViewDetails(user, "reject")}
                            className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs font-medium"
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Reject
                          </button>
                          <button
                            onClick={() => handleViewDetails(user, "view")}
                            className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs font-medium"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No KYC applications found matching your search.
                </div>
              )}
            </div>
          </div>
        ) : (
          // Details View - Individual KYC Review
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Details Card */}
              <div className="bg-card rounded-lg border border-border p-5">
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-primary mr-2" />
                  <h2 className="text-base font-bold text-foreground">User Details</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      User ID
                    </label>
                    <p className="text-sm text-foreground font-medium">{selectedUser?.userId}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Full Name
                    </label>
                    <p className="text-sm text-foreground font-medium">{selectedUser?.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Email Address
                    </label>
                    <p className="text-sm text-foreground">{selectedUser?.email}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Phone Number
                    </label>
                    <p className="text-sm text-foreground">{selectedUser?.phone}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Gender
                    </label>
                    <p className="text-sm text-foreground">{selectedUser?.gender}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Address
                    </label>
                    <p className="text-sm text-foreground">{selectedUser?.address}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      ZIP Code
                    </label>
                    <p className="text-sm text-foreground">{selectedUser?.zipCode}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* PAN Card Details Card */}
                <div className="bg-card rounded-lg border border-border p-5">
                  <div className="flex items-center mb-4">
                    <CreditCard className="w-5 h-5 text-primary mr-2" />
                    <h2 className="text-base font-bold text-foreground">PAN Card Details</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        PAN Number
                      </label>
                      <p className="text-sm text-foreground font-medium">{selectedUser?.panNumber}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        Aadhaar Number
                      </label>
                      <p className="text-sm text-foreground font-medium">{selectedUser?.aadhaarNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Bank Account Details Card */}
                <div className="bg-card rounded-lg border border-border p-5">
                  <div className="flex items-center mb-4">
                    <Building className="w-5 h-5 text-primary mr-2" />
                    <h2 className="text-base font-bold text-foreground">Bank Account Details</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        Account Number
                      </label>
                      <p className="text-sm text-foreground font-medium">{selectedUser?.accountNumber}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        IFSC Code
                      </label>
                      <p className="text-sm text-foreground">{selectedUser?.ifscCode}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        Bank Name
                      </label>
                      <p className="text-sm text-foreground">{selectedUser?.bankName}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        Branch Address
                      </label>
                      <p className="text-sm text-foreground">{selectedUser?.branchAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Only show for approve/reject actions */}
            {actionType !== "view" && (
              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={handleBackToTable}
                  className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  Cancel
                </button>
                {actionType === "approve" && (
                  <button
                    onClick={handleApprove}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm Approval</span>
                  </button>
                )}
                {actionType === "reject" && (
                  <button
                    onClick={handleReject}
                    className="px-6 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors flex items-center space-x-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Confirm Rejection</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}