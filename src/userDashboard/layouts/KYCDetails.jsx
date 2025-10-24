import React, { useState } from "react";

const KYCDetails = ({ darkMode }) => {
  const [form, setForm] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@campaignwaala.com",
    phone: "+91 98765 43210",
    dob: "",
    gender: "",
    address1: "123, Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    zip: "400001",
    country: "India",
    pan: "ERAPA76845ER",
    aadhaar: "12457 1457 8579",
    bankName: "Axis Bank",
    accountHolder: "John Doe",
    accountNumber: "XXXXXXXXXXXX1234",
    ifsc: "AXIS0000001",
    branch: "Gandhi Nagar Branch, Mumbai",
  });

  // Section edit toggles
  const [editPersonal, setEditPersonal] = useState(false);
  const [editKYC, setEditKYC] = useState(false);
  const [editBank, setEditBank] = useState(false);

  const labelClass = `block text-sm font-medium mb-1 ${
    darkMode ? "text-gray-300" : "text-gray-700"
  }`;

  const smallInput = (editable) =>
    `w-full rounded-md border p-2 text-sm outline-none transition duration-200 ${
      editable
        ? darkMode
          ? "bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500"
          : "bg-white border-gray-300 focus:border-blue-600"
        : darkMode
        ? "bg-gray-800 border-gray-700 text-gray-400 cursor-not-allowed"
        : "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
    }`;

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sectionHeader = (title, editable, toggleFn) => (
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <button
        onClick={toggleFn}
        className={`text-sm px-3 py-1 rounded-md transition ${
          editable
            ? darkMode
              ? "bg-green-700 hover:bg-green-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
            : darkMode
            ? "bg-blue-700 hover:bg-blue-600 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {editable ? "Save" : "Edit"}
      </button>
    </div>
  );

  return (
    <div
      className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 transition-all duration-300 ${
        darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h2 className="text-xl font-bold mb-2">KYC/Personal Details</h2>
        <div className="mb-6">
          <p className="text-sm font-medium">
            KYC Verification Status:{" "}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                darkMode
                  ? "bg-yellow-900 text-yellow-300"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              Pending Review by Admin
            </span>
          </p>
        </div>

        {/* Personal Details */}
        <section
          className={`${
            darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          } border rounded-xl p-6 shadow-sm mb-6`}
        >
          {sectionHeader("Personal Details", editPersonal, () =>
            setEditPersonal(!editPersonal)
          )}
          <p className="text-sm text-gray-500 mb-5">
            Ensure all details are accurate and up-to-date for verification.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              ["First Name", "firstName"],
              ["Last Name", "lastName"],
              ["Email Address", "email"],
              ["Phone Number", "phone"],
              ["Date of Birth", "dob", "date"],
              ["Gender", "gender", "select"],
              ["Address Line 1", "address1"],
              ["City", "city"],
              ["State", "state"],
              ["ZIP Code", "zip"],
              ["Country", "country"],
            ].map(([label, name, type]) => (
              <div key={name}>
                <label className={labelClass}>{label}</label>
                {type === "select" ? (
                  <select
                    name={name}
                    value={form[name]}
                    onChange={handleInput}
                    disabled={!editPersonal}
                    className={smallInput(editPersonal)}
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                ) : (
                  <input
                    type={type || "text"}
                    name={name}
                    value={form[name]}
                    onChange={handleInput}
                    readOnly={!editPersonal}
                    className={smallInput(editPersonal)}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* KYC Documents */}
        <section
          className={`${
            darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          } border rounded-xl p-6 shadow-sm mb-6`}
        >
          {sectionHeader("KYC Documents", editKYC, () => setEditKYC(!editKYC))}
          <p className="text-sm text-gray-500 mb-5">
            Please upload clear images of your PAN Card and Aadhar Card.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>PAN Card</label>
              <input
                name="pan"
                value={form.pan}
                onChange={handleInput}
                readOnly={!editKYC}
                className={smallInput(editKYC)}
              />
            </div>

            <div>
              <label className={labelClass}>Aadhaar Card</label>
              <input
                name="aadhaar"
                value={form.aadhaar}
                onChange={handleInput}
                readOnly={!editKYC}
                className={smallInput(editKYC)}
              />
            </div>
          </div>
        </section>

        {/* Bank Details */}
        <section
          className={`${
            darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          } border rounded-xl p-6 shadow-sm mb-6`}
        >
          {sectionHeader("Bank Details", editBank, () =>
            setEditBank(!editBank)
          )}
          <p className="text-sm text-gray-500 mb-5">
            Provide your bank account details for smooth withdrawals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Bank Name</label>
              <input
                name="bankName"
                value={form.bankName}
                onChange={handleInput}
                readOnly={!editBank}
                className={smallInput(editBank)}
              />
            </div>
            <div>
              <label className={labelClass}>Account Holder Name</label>
              <input
                name="accountHolder"
                value={form.accountHolder}
                onChange={handleInput}
                readOnly={!editBank}
                className={smallInput(editBank)}
              />
            </div>
            <div>
              <label className={labelClass}>Account Number</label>
              <input
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleInput}
                readOnly={!editBank}
                className={smallInput(editBank)}
              />
            </div>
            <div>
              <label className={labelClass}>IFSC Code</label>
              <input
                name="ifsc"
                value={form.ifsc}
                onChange={handleInput}
                readOnly={!editBank}
                className={smallInput(editBank)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Branch Address</label>
              <input
                name="branch"
                value={form.branch}
                onChange={handleInput}
                readOnly={!editBank}
                className={smallInput(editBank)}
              />
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Save and Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYCDetails;
