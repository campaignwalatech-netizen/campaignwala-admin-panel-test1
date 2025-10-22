import React from "react";

const ZeroFeeDemat = ({ darkMode }) => {
  const copyLink = () => {
    navigator.clipboard.writeText("https://campaignwaala.com/ref/johndoe/demat");
    alert("Link copied to clipboard!");
  };

  return (
    <div
      className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-10 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center md:text-left">
        Zero-Fee Demat Account
      </h2>

      {/* Earning Structure */}
      <section
        className={`rounded-xl p-5 sm:p-6 mb-8 shadow-md ${
          darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        }`}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-5 flex items-center gap-2">
          💰 Earning Structure
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base">
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
            }`}
          >
            <p className="font-semibold">Base Commission:</p>
            <p>₹500 per approved application</p>
          </div>
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
            }`}
          >
            <p className="font-semibold">Bonus for 5+ Applications:</p>
            <p>Additional ₹100 per application</p>
          </div>
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
            }`}
          >
            <p className="font-semibold">Monthly Target Bonus:</p>
            <p>₹2000 for 20+ applications</p>
          </div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section
        className={`rounded-xl p-5 sm:p-6 mb-8 shadow-md ${
          darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        }`}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-5 flex items-center gap-2">
          📜 Terms & Conditions
        </h3>
        <ul className="text-sm sm:text-base space-y-2 leading-relaxed">
          <li>Applicants must be Indian citizens aged 18 or above.</li>
          <li>A minimum CIBIL score of 700 is required.</li>
          <li>Income proof is mandatory for approval.</li>
          <li>Campaign Waala reserves the right to review and approve all applications.</li>
        </ul>
      </section>

      {/* Trackable Link Section */}
      <section
        className={`rounded-xl p-5 sm:p-6 shadow-md ${
          darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        }`}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-5 flex items-center gap-2">
          🔗 Your Unique Trackable Link
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            readOnly
            value="https://campaignwaala.com/ref/johndoe/demat"
            className={`flex-1 px-4 py-2 rounded-md border text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-200"
                : "bg-gray-100 border-gray-300 text-gray-800"
            }`}
          />
          <button
            onClick={copyLink}
            className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Copy Link
          </button>
        </div>
      </section>
    </div>
  );
};

export default ZeroFeeDemat;