import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileOverview = ({ darkMode }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen pt-10 pb-16 px-4 sm:px-6 md:px-10 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
        Profile Settings Overview
      </h2>

      <div
        className={`rounded-2xl shadow-sm mb-6 overflow-hidden border ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div
          className="h-24 sm:h-32 w-full"
          style={{
            background:
              "linear-gradient(135deg, #e0e0e0, #f8f8f8, #f0f0f0, #ffffff)",
          }}
        ></div>

        <div className="flex flex-col items-center -mt-10 pb-6 text-center">
          <img
            src="https://i.pravatar.cc/100"
            alt="User avatar"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md"
          />
          <h3
            className={`text-lg sm:text-xl font-semibold mt-3 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            John Doe
          </h3>
          <p
            className={`text-sm sm:text-base ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            john.doe@campaignwaala.com
          </p>
          <p
            className={`text-sm sm:text-base ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            +91 98765 43210
          </p>
        </div>
      </div>

      <div
        className={`rounded-2xl shadow-sm border mb-6 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-indigo-100"
        }`}
      >
        <div className="text-center sm:text-left">
          <h4
            className={`text-base sm:text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            KYC Verification Status
          </h4>
          <span
            className={`inline-block mt-2 px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${
              darkMode
                ? "bg-yellow-900 text-yellow-300"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            Pending Review by Admin
          </span>
        </div>

        <button
          onClick={() => navigate("/user/kyc-details")}
          className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Update Profile / KYC
        </button>
      </div>

      <div
        className={`rounded-2xl border shadow-sm p-6 sm:p-10 text-center ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-blue-50 border-blue-200"
        }`}
      >
        <h3
          className={`text-lg sm:text-xl font-semibold mb-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          YOUR CAMPAIGN WAALA CARD
        </h3>
        <p
          className={`text-sm sm:text-base mb-6 max-w-xl mx-auto leading-relaxed ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Your personalized digital card for seamless earnings and exclusive
          benefits.
        </p>

        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_card.gif"
          alt="Digital Card"
          className="w-48 sm:w-60 md:w-72 mx-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default ProfileOverview;
