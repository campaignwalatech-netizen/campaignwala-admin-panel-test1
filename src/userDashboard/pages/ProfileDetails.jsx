import React from 'react';
import { UserCircle2, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react';

const ProfileDetails = () => {
  const userProfile = {
    name: 'Rahul Kumar',
    email: 'rahul.kumar@campaignwala.com',
    phone: '+91 9876543211',
    address: '123 MG Road, Bangalore, Karnataka 560001',
    joinDate: '2024-01-15',
    employeeId: 'CW001234',
    department: 'Sales',
    designation: 'Lead Generation Executive',
    manager: 'Priya Sharma',
    bankAccount: 'XXXX-XXXX-XXXX-5678',
    panNumber: 'ABCDE1234F',
    aadharNumber: 'XXXX-XXXX-5678'
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <UserCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Profile Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Profile Picture and Basic Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <UserCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
              {userProfile.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">
              {userProfile.designation}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              ID: {userProfile.employeeId}
            </p>
            <button className="mt-4 flex items-center gap-2 mx-auto px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
              <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white break-all">{userProfile.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{userProfile.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Address</p>
                <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white break-words">{userProfile.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Employment Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 lg:col-span-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">Employment Details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Join Date</p>
                <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(userProfile.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Department</p>
              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{userProfile.department}</p>
            </div>
            
            <div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Reporting Manager</p>
              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{userProfile.manager}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Information */}
      <div className="mt-4 sm:mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">Financial Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Bank Account</p>
            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{userProfile.bankAccount}</p>
          </div>
          
          <div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">PAN Number</p>
            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{userProfile.panNumber}</p>
          </div>
          
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Aadhar Number</p>
            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{userProfile.aadharNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;