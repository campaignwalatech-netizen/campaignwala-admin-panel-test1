import { useState } from "react";
import { Search, User, CreditCard, MapPin, Building, CheckCircle, XCircle } from "lucide-react";

export default function KYCReview() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState({
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
    branchAddress: "HDFC Bank, Jasola Vihar, New Delhi"
  });

  const handleApprove = () => {
    console.log("KYC Approved for:", selectedUser.fullName);
    alert(`KYC approved for ${selectedUser.fullName}`);
  };

  const handleReject = () => {
    const reason = prompt("Please enter reason for rejection:");
    if (reason) {
      console.log("KYC Rejected for:", selectedUser.fullName, "Reason:", reason);
      alert(`KYC rejected for ${selectedUser.fullName}`);
    }
  };

  return (
    <div className="h-full flex flex-col p-3 sm:p-4 bg-background">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-semibold">
                {selectedUser.fullName.charAt(0)}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              KYC Review for {selectedUser.fullName}
            </h1>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users, teams, others..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
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
                  <p className="text-sm text-foreground font-medium">{selectedUser.userId}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Full Name
                  </label>
                  <p className="text-sm text-foreground font-medium">{selectedUser.fullName}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Email Address
                  </label>
                  <p className="text-sm text-foreground">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Phone Number
                  </label>
                  <p className="text-sm text-foreground">{selectedUser.phone}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Gender
                  </label>
                  <p className="text-sm text-foreground">{selectedUser.gender}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Address
                  </label>
                  <p className="text-sm text-foreground">{selectedUser.address}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    ZIP Code
                  </label>
                  <p className="text-sm text-foreground">{selectedUser.zipCode}</p>
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
                      Document Number
                    </label>
                    <p className="text-sm text-foreground font-mono">{selectedUser.panNumber}</p>
                  </div>
                </div>
              </div>

              {/* Aadhaar Card Details Card */}
              <div className="bg-card rounded-lg border border-border p-5">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-5 h-5 text-primary mr-2" />
                  <h2 className="text-base font-bold text-foreground">Aadhaar Card Details</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Document Number
                    </label>
                    <p className="text-sm text-foreground font-mono">{selectedUser.aadhaarNumber}</p>
                  </div>
                </div>
              </div>

              {/* Bank Details Card */}
              <div className="bg-card rounded-lg border border-border p-5">
                <div className="flex items-center mb-4">
                  <Building className="w-5 h-5 text-primary mr-2" />
                  <h2 className="text-base font-bold text-foreground">Bank Details</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Account Number
                    </label>
                    <p className="text-sm text-foreground font-mono">{selectedUser.accountNumber}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      IFSC Code
                    </label>
                    <p className="text-sm text-foreground font-mono">{selectedUser.ifscCode}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Bank Name
                    </label>
                    <p className="text-sm text-foreground">{selectedUser.bankName}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Branch Address
                    </label>
                    <p className="text-sm text-foreground">{selectedUser.branchAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-8 pb-4">
            <button
              onClick={handleReject}
              className="flex items-center justify-center px-6 py-3 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-medium rounded-lg transition-colors duration-200 shadow-sm"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject and Send Back
            </button>
            <button
              onClick={handleApprove}
              className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve KYC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}