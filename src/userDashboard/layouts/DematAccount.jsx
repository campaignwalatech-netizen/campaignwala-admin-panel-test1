import React from "react";
import { useNavigate } from "react-router-dom";

const DematAccount = ({ darkMode }) => {
  const navigate = useNavigate();

  // 🟩 Navigate to Zero-Fee Demat Page
  const handleShare = () => {
    navigate("/user/zerofee-demat");
  };

  // 🟦 Navigate to BNPL Offer Details Page
  const handleViewDetails = () => {
    navigate("/demat-offer-details");
  };

  return (
    <div
      className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-10 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center md:text-left">
        Browse Available Offers
      </h2>

      {/* Tabs */}
      <div className="flex justify-center md:justify-start mb-10">
        <button
          className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium border ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-gray-100 border-gray-200 text-gray-800"
          }`}
        >
          DEMAT Account
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 max-w-6xl mx-auto w-full">
        {/* Zero-Fee Demat Account Card */}
        <div
          className={`rounded-xl border shadow-sm p-6 sm:p-8 flex flex-col justify-between transition hover:shadow-lg ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div>
            <h3
              className={`text-lg sm:text-xl font-semibold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Zero-Fee Demat Account
            </h3>
            <p
              className={`text-sm sm:text-base mb-4 leading-relaxed ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Open a Demat account with zero annual maintenance charges and start
              investing easily.
            </p>
            <p className="text-sm sm:text-base text-green-600 font-medium mb-6">
              Earn ₹500 per lead
            </p>
          </div>
          <button
            onClick={handleShare}
            className="w-full py-2 sm:py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition"
          >
            Share
          </button>
        </div>

        {/* Buy Now Pay Later Card */}
        <div
          className={`rounded-xl border shadow-sm p-6 sm:p-8 flex flex-col justify-between transition hover:shadow-lg ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div>
            <h3
              className={`text-lg sm:text-xl font-semibold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Buy Now, Pay Later
            </h3>
            <p
              className={`text-sm sm:text-base mb-4 leading-relaxed ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Flexible payment options for online shopping without immediate
              payment.
            </p>
            <p className="text-sm sm:text-base text-green-600 font-medium mb-6">
              Earn ₹300 per activated account
            </p>
          </div>
          <button
            
            className="w-full py-2 sm:py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default DematAccount;