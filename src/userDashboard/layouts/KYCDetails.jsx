import React, { useState } from "react";

const KYCDetails = ({ darkMode }) => {
  const [panFile, setPanFile] = useState(null);
  const [aadhaarFront, setAadhaarFront] = useState(null);
  const [aadhaarBack, setAadhaarBack] = useState(null);

  return (
    <div
      className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-10 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Page Title */}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
        KYC / Personal Details
      </h2>

      {/* KYC Verification Status */}
      <div
        className={`rounded-xl shadow-sm border mb-8 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-indigo-100"
        }`}
      >
        <h4
          className={`text-base sm:text-lg font-medium ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          KYC Verification Status:
        </h4>
        <span
          className={`mt-2 sm:mt-0 inline-block px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${
            darkMode
              ? "bg-yellow-900 text-yellow-300"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          Pending Review by Admin
        </span>
      </div>

      {/* Personal Details */}
      <div
        className={`rounded-xl border mb-8 p-6 sm:p-8 shadow-sm ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          Personal Details
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Ensure all details are accurate and up-to-date for verification.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <input className="input" placeholder="First Name" defaultValue="John" />
          <input className="input" placeholder="Last Name" defaultValue="Doe" />
          <input className="input" placeholder="Email Address" defaultValue="john.doe@campaignwaala.com" />
          <input className="input" placeholder="Phone Number" defaultValue="+91 98765 43210" />
          <input className="input" placeholder="Date of Birth (DD/MM/YYYY)" />
          <select className="input">
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input className="input" placeholder="Address Line 1" defaultValue="123, Main Street" />
          <input className="input" placeholder="Address Line 2" />
          <input className="input" placeholder="City" defaultValue="Mumbai" />
          <input className="input" placeholder="State" defaultValue="Maharashtra" />
          <input className="input" placeholder="ZIP Code" defaultValue="400001" />
          <input className="input" placeholder="Country" defaultValue="India" />
        </div>
      </div>

      {/* KYC Documents */}
      <div
        className={`rounded-xl border mb-8 p-6 sm:p-8 shadow-sm ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-2">KYC Documents</h3>
        <p className="text-sm text-gray-500 mb-6">
          Please upload clear, colored images of your PAN Card and Aadhaar Card. Max file size: 5MB.
        </p>

        {/* PAN Card Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-6">
          <input
            type="text"
            className="input"
            placeholder="PAN_Card_Front.jpg"
            value={panFile ? panFile.name : "PAN_Card_Front.jpg"}
            readOnly
          />
          <button
            onClick={() => document.getElementById("panUpload").click()}
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Upload
          </button>
          <p className="text-xs text-gray-500 sm:text-right">
            Accepted formats: JPG, PNG, PDF
          </p>
          <input
            type="file"
            id="panUpload"
            className="hidden"
            onChange={(e) => setPanFile(e.target.files[0])}
          />
        </div>

        {/* Aadhaar Card Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4">
          <input
            type="text"
            className="input"
            placeholder="Aadhaar_Front.jpg"
            value={aadhaarFront ? aadhaarFront.name : "Aadhaar_Front.jpg"}
            readOnly
          />
          <button
            onClick={() => document.getElementById("aadhaarFrontUpload").click()}
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Upload
          </button>
          <input
            type="file"
            id="aadhaarFrontUpload"
            className="hidden"
            onChange={(e) => setAadhaarFront(e.target.files[0])}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <input
            type="text"
            className="input"
            placeholder="Aadhaar_Back.jpg"
            value={aadhaarBack ? aadhaarBack.name : "Aadhaar_Back.jpg"}
            readOnly
          />
          <button
            onClick={() => document.getElementById("aadhaarBackUpload").click()}
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Upload
          </button>
          <p className="text-xs text-gray-500 sm:text-right">
            Accepted formats: JPG, PNG (Front and Back side)
          </p>
          <input
            type="file"
            id="aadhaarBackUpload"
            className="hidden"
            onChange={(e) => setAadhaarBack(e.target.files[0])}
          />
        </div>
      </div>

      {/* Bank Details */}
      <div
        className={`rounded-xl border p-6 sm:p-8 shadow-sm ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Bank Details</h3>
        <p className="text-sm text-gray-500 mb-6">
          Provide your bank account details for smooth withdrawals.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <input className="input" placeholder="Bank Name" defaultValue="Axis Bank" />
          <input className="input" placeholder="Account Holder Name" defaultValue="John Doe" />
          <input className="input" placeholder="Account Number" defaultValue="XXXXXXXXXXXX1234" />
          <input className="input" placeholder="IFSC Code" defaultValue="AXIS0000001" />
          <input
            className="input sm:col-span-2"
            placeholder="Branch Address"
            defaultValue="Goregaon Branch, Mumbai"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-8">
        <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
          Save and Submit
        </button>
      </div>
    </div>
  );
};

export default KYCDetails;