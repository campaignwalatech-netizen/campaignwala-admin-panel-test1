import { useState, useRef } from "react";
import { Upload, Download, FileText, CheckCircle, AlertCircle } from "lucide-react";

export default function ApproveProjectTable() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // success, error, or empty
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (file.type !== "text/csv" && !file.name.endsWith('.csv')) {
        setUploadStatus("error");
        alert("Please select a valid CSV file");
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
      if (file.type === "text/csv" || file.name.endsWith('.csv')) {
        const event = { target: { files: [file] } };
        handleFileUpload(event);
      } else {
        alert("Please drop a CSV file");
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

  const downloadTemplate = () => {
    // Create sample CSV content
    const csvContent = "Project ID,Project Name,Client Name,Budget,Date,Status\n1,Sample Project,Sample Client,50000,2024-10-24,Pending\n2,Demo Campaign,Demo Corp,75000,2024-10-25,Approved";
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project_template.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
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
              Project Approval Center
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Streamline your project approval workflow with bulk CSV processing
            </p>
          </div>
          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" />
            Download Template
          </button>
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
                CSV File Upload
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Upload your project data file for bulk processing
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
                        Process Projects
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                      <Upload className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-3">
                      Drop your CSV file here
                    </h4>
                    <p className="text-muted-foreground mb-6 max-w-md text-center leading-relaxed">
                      Drag and drop your project data file, or{" "}
                      <span className="text-primary font-semibold cursor-pointer hover:underline">
                        click to browse
                      </span>{" "}
                      and select from your computer
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>CSV Format</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Max 10MB</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Secure Upload</span>
                      </div>
                    </div>
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
                    Your CSV file has been processed and is ready for project approval
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
                <FileText className="w-5 h-5 text-blue-600" />
                CSV Format Requirements
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-semibold text-foreground mb-3">Required Columns</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">Project ID</span>
                      <span className="text-muted-foreground">(Unique identifier)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Project Name</span>
                      <span className="text-muted-foreground">(Text)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="font-medium">Client Name</span>
                      <span className="text-muted-foreground">(Text)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-foreground mb-3">Data Formats</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="font-medium">Budget</span>
                      <span className="text-muted-foreground">(Numeric only)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span className="font-medium">Date</span>
                      <span className="text-muted-foreground">(YYYY-MM-DD)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="font-medium">Status</span>
                      <span className="text-muted-foreground">(Pending/Approved/Rejected)</span>
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
