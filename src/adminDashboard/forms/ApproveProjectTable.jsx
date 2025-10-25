import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, FileSpreadsheet, ToggleLeft, ToggleRight, UserCheck, UserX } from "lucide-react";

export default function ApproveOffersTable() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // success, error, or empty
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Sample accounts data with approval status
  const [accounts, setAccounts] = useState([
    { 
      id: 1, 
      leadId: "LEAD001", 
      customerContact: "+91 9876543210", 
      name: "Rajesh Kumar", 
      email: "rajesh@example.com", 
      company: "Tech Solutions Pvt Ltd", 
      budget: 250000, 
      date: "2024-10-20", 
      isApproved: false 
    },
    { 
      id: 2, 
      leadId: "LEAD002", 
      customerContact: "+91 8765432109", 
      name: "Priya Sharma", 
      email: "priya@example.com", 
      company: "Digital Marketing Co", 
      budget: 150000, 
      date: "2024-10-21", 
      isApproved: true 
    },
    { 
      id: 3, 
      leadId: "LEAD003", 
      customerContact: "+91 7654321098", 
      name: "Amit Patel", 
      email: "amit@example.com", 
      company: "Startup Hub", 
      budget: 75000, 
      date: "2024-10-22", 
      isApproved: false 
    },
    { 
      id: 4, 
      leadId: "LEAD004", 
      customerContact: "+91 6543210987", 
      name: "Sneha Gupta", 
      email: "sneha@example.com", 
      company: "E-commerce Plus", 
      budget: 320000, 
      date: "2024-10-23", 
      isApproved: true 
    }
  ]);

  // Toggle approval status
  const toggleApproval = (accountId) => {
    setAccounts(accounts.map(acc => 
      acc.id === accountId ? {...acc, isApproved: !acc.isApproved} : acc
    ));
  };

  // Export accounts to Excel/CSV
  const exportToExcel = () => {
    const csvContent = "Lead ID,Customer Contact,Name,Email,Company,Budget,Date,Status\n" + 
      accounts.map(acc => 
        `${acc.leadId},${acc.customerContact},"${acc.name}",${acc.email},"${acc.company}",${acc.budget},${acc.date},${acc.isApproved ? 'Approved' : 'Pending'}`
      ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Accounts_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type - support both CSV and Excel
      const isValidFile = file.type === "text/csv" || 
                         file.name.endsWith('.csv') || 
                         file.name.endsWith('.xlsx') || 
                         file.name.endsWith('.xls');
      
      if (!isValidFile) {
        setUploadStatus("error");
        alert("Please select a valid CSV or Excel file (.csv, .xlsx, .xls)");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setUploadStatus("error");
        alert("File size should be less than 10MB");
        return;
      }

      setIsUploading(true);
      
      // Simulate upload process
      setTimeout(() => {
        setUploadedFile(file);
        setUploadStatus("success");
        setIsUploading(false);
        console.log("CSV file uploaded:", file.name);
      }, 1500);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const isValidFile = file.type === "text/csv" || 
                         file.name.endsWith('.csv') || 
                         file.name.endsWith('.xlsx') || 
                         file.name.endsWith('.xls');
      
      if (isValidFile) {
        const event = { target: { files: [file] } };
        handleFileUpload(event);
      } else {
        alert("Please drop a CSV or Excel file");
      }
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadStatus("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };



  return (
    <div className="h-full flex flex-col bg-background">
      {/* Professional Header Section */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              Account Approval Center
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Manage account approvals with Excel/CSV import and individual toggle controls
            </p>
          </div>
          
          {/* Right side with title and toggle */}
          <div className="flex items-center gap-4">
            {/* Unapprove Account Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Unapprove Account</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={accounts.some(acc => acc.isApproved)}
                  onChange={() => {
                    const hasApproved = accounts.some(acc => acc.isApproved);
                    setAccounts(accounts.map(acc => ({...acc, isApproved: !hasApproved})));
                  }}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Professional Upload Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 px-6 py-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Excel/CSV File Upload
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Upload your account data file (.csv, .xlsx, .xls) for bulk processing
              </p>
            </div>

            {/* Upload Zone */}
            <div className="p-6">
              <div
                className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 group ${
                  uploadStatus === "success" 
                    ? "border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20" 
                    : uploadStatus === "error"
                    ? "border-red-400 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20"
                    : "border-gray-300 hover:border-primary bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/50 hover:from-primary/5 hover:to-purple-50 dark:hover:to-purple-900/20"
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <div className="relative mb-6">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Processing Upload</h4>
                    <p className="text-sm text-muted-foreground">Please wait while we process your CSV file...</p>
                  </div>
                ) : uploadedFile ? (
                  <div className="flex flex-col items-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-2">Upload Successful!</h4>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-border mb-6 shadow-sm">
                      <div className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-green-600" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">{uploadedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(uploadedFile.size / 1024).toFixed(1)} KB • Processed successfully
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile();
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                      >
                        Upload Different File
                      </button>
                      <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                        Process Accounts
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <h4 className="text-xl font-bold text-foreground mb-8">
                      Choose File Type to Upload
                    </h4>
                    
                    {/* File Type Selection Icons */}
                    <div className="flex items-center gap-8 mb-8">
                      {/* XLS File Upload */}
                      <div 
                        className="flex flex-col items-center cursor-pointer group"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = '.xlsx,.xls';
                          input.onchange = handleFileUpload;
                          input.click();
                        }}
                      >
                        <div className="w-24 h-32 bg-gray-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200 shadow-lg relative overflow-hidden">
                          {/* File corner fold */}
                          <div className="absolute top-0 right-0 w-6 h-6 bg-gray-500 transform rotate-45 translate-x-3 -translate-y-3"></div>
                          <div className="absolute top-0 right-0 w-4 h-4 border-l border-b border-gray-400"></div>
                          
                          {/* XLS text */}
                          <span className="text-white font-bold text-lg">XLS</span>
                          
                          {/* Upload arrows */}
                          <div className="absolute right-2 top-8 space-y-1">
                            <div className="w-0 h-0 border-l-2 border-r-2 border-b-3 border-transparent border-b-orange-400"></div>
                            <div className="w-0 h-0 border-l-2 border-r-2 border-b-3 border-transparent border-b-orange-400"></div>
                            <div className="w-0 h-0 border-l-2 border-r-2 border-b-3 border-transparent border-b-orange-400"></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-foreground group-hover:text-primary">Upload Excel File</span>
                      </div>

                      {/* CSV File Upload */}
                      <div 
                        className="flex flex-col items-center cursor-pointer group"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = '.csv';
                          input.onchange = handleFileUpload;
                          input.click();
                        }}
                      >
                        <div className="w-24 h-32 bg-slate-600 rounded-lg flex flex-col items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200 shadow-lg relative">
                          {/* Cloud icon */}
                          <div className="bg-white rounded-full p-2 mb-2">
                            <div className="w-8 h-6 bg-slate-600 rounded-t-full relative">
                              <div className="absolute inset-x-0 top-2 h-2 bg-slate-600 rounded-full"></div>
                              <div className="absolute left-1/2 transform -translate-x-1/2 top-4 w-0 h-0 border-l-2 border-r-2 border-t-3 border-transparent border-t-slate-600"></div>
                            </div>
                          </div>
                          
                          {/* CSV text */}
                          <span className="text-white font-bold text-sm">CSV</span>
                        </div>
                        <span className="text-sm font-medium text-foreground group-hover:text-primary">Upload CSV File</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-center text-sm max-w-md">
                      Click on Excel (XLS) or CSV icon to upload your account data file. 
                      Maximum file size: 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Status Messages */}
            {uploadStatus === "success" && (
              <div className="mx-6 mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3 shadow-sm">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-800 dark:text-green-200">
                    Upload Complete
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Your CSV file has been processed and is ready for Offers approval
                  </p>
                </div>
              </div>
            )}

            {uploadStatus === "error" && (
              <div className="mx-6 mb-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 shadow-sm">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                    Upload Failed
                  </p>
                  <p className="text-xs text-red-700 dark:text-red-300">
                    Please check your file format and try again
                  </p>
                </div>
              </div>
            )}
          </div>



          {/* Professional Instructions Card */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm">
            <div className="p-6">
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                Excel/CSV Format Requirements
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-semibold text-foreground mb-3">Required Columns</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">Lead ID</span>
                      <span className="text-muted-foreground">(Unique identifier)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Customer Contact</span>
                      <span className="text-muted-foreground">(Phone number)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="font-medium">Name</span>
                      <span className="text-muted-foreground">(Full name)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="font-medium">Email</span>
                      <span className="text-muted-foreground">(Email address)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-foreground mb-3">Additional Fields</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="font-medium">Company</span>
                      <span className="text-muted-foreground">(Company name)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span className="font-medium">Budget</span>
                      <span className="text-muted-foreground">(Numeric only)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="font-medium">Date</span>
                      <span className="text-muted-foreground">(YYYY-MM-DD)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="font-medium">Status</span>
                      <span className="text-muted-foreground">(Pending/Approved)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
