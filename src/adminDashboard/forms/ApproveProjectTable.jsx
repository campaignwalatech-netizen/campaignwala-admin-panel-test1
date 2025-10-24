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
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Approve Projects - CSV Upload</h2>
        <p className="text-sm text-muted-foreground">
          Upload a CSV file containing project data for bulk approval processing.
        </p>
      </div>

      {/* Download Template */}
      <div className="mb-6">
        <button
          onClick={downloadTemplate}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium border border-border"
        >
          <Download className="w-4 h-4" />
          Download CSV Template
        </button>
      </div>

      {/* Upload Area */}
      <div className="flex-1 max-w-2xl">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
            uploadStatus === "success" 
              ? "border-green-300 bg-green-50 dark:bg-green-900/20" 
              : uploadStatus === "error"
              ? "border-red-300 bg-red-50 dark:bg-red-900/20"
              : "border-border hover:border-primary bg-muted/30"
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

          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-sm text-muted-foreground">Uploading CSV file...</p>
            </div>
          ) : uploadedFile ? (
            <div className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">File Uploaded Successfully!</h3>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{uploadedFile.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(uploadedFile.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="px-4 py-2 text-sm bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
              >
                Remove File
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Upload CSV File
              </h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                Drag and drop your CSV file here, or click to browse and select a file
              </p>
              <div className="text-xs text-muted-foreground">
                <p>Supported format: CSV</p>
                <p>Maximum file size: 10MB</p>
              </div>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {uploadStatus === "success" && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-sm text-green-800 dark:text-green-200">
              CSV file uploaded successfully! The projects are ready for processing.
            </p>
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-800 dark:text-red-200">
              There was an error uploading the file. Please check the file format and try again.
            </p>
          </div>
        )}

        {/* Upload Instructions */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="text-sm font-semibold text-foreground mb-2">CSV Format Requirements:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• First row should contain column headers</li>
            <li>• Required columns: Project ID, Project Name, Client Name, Budget, Date, Status</li>
            <li>• Date format: YYYY-MM-DD</li>
            <li>• Budget should be numeric values only</li>
            <li>• Status values: Pending, Approved, Rejected</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
