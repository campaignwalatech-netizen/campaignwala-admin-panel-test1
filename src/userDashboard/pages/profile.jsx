import React from "react";

const Profile = ({ darkMode }) => {
  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="p-6">
        <div className="mb-6">
          <h2 className={`text-3xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>Profile</h2>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Manage your account settings and preferences</p>
        </div>

        <div className={`rounded-lg border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"} shadow-sm p-6`}>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>Profile Information</h3>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Full Name</label>
              <input 
                type="text" 
                defaultValue="John Doe"
                className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                  darkMode 
                    ? "bg-gray-700 border-gray-600 text-white" 
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Email</label>
              <input 
                type="email" 
                defaultValue="john.doe@example.com"
                className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                  darkMode 
                    ? "bg-gray-700 border-gray-600 text-white" 
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Phone</label>
              <input 
                type="tel" 
                defaultValue="+91 9876543210"
                className={`mt-1 block w-full px-3 py-2 border rounded-md ${
                  darkMode 
                    ? "bg-gray-700 border-gray-600 text-white" 
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            <div className="pt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;