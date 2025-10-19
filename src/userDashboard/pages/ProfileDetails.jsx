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
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <UserCircle2 className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture and Basic Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <UserCircle2 className="w-16 h-16 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {userProfile.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {userProfile.designation}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ID: {userProfile.employeeId}
            </p>
            <button className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{userProfile.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{userProfile.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{userProfile.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Employment Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Employment Details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Join Date</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(userProfile.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{userProfile.department}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Reporting Manager</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{userProfile.manager}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Information */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Financial Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Bank Account</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{userProfile.bankAccount}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">PAN Number</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{userProfile.panNumber}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Aadhar Number</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{userProfile.aadharNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;