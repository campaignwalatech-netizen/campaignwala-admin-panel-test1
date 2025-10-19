import React, { useState } from 'react';
import { Clock3, Search, Filter, Eye, User, CreditCard, FileText, Calendar } from 'lucide-react';

const PendingAccount = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const pendingAccounts = [
    {
      id: 1,
      customerName: 'Rajesh Kumar',
      phone: '+91 9876543210',
      email: 'rajesh.kumar@email.com',
      productType: 'Credit Card',
      productName: 'HDFC Regalia',
      applicationId: 'CC001234',
      submittedDate: '2024-10-18',
      status: 'document_review',
      estimatedCompletion: '2024-10-25',
      documents: ['Aadhar', 'PAN', 'Salary Slip'],
      remarks: 'Waiting for bank verification',
      priority: 'high'
    },
    {
      id: 2,
      customerName: 'Priya Sharma',
      phone: '+91 9876543211',
      email: 'priya.sharma@email.com',
      productType: 'Personal Loan',
      productName: 'ICICI Personal Loan',
      applicationId: 'PL005678',
      submittedDate: '2024-10-17',
      status: 'bank_verification',
      estimatedCompletion: '2024-10-24',
      documents: ['Aadhar', 'PAN', 'Bank Statement'],
      remarks: 'Under credit assessment',
      priority: 'medium'
    },
    {
      id: 3,
      customerName: 'Amit Singh',
      phone: '+91 9876543212',
      email: 'amit.singh@email.com',
      productType: 'Demat Account',
      productName: 'Zerodha Demat',
      applicationId: 'DM009876',
      submittedDate: '2024-10-16',
      status: 'kyc_pending',
      estimatedCompletion: '2024-10-23',
      documents: ['Aadhar', 'PAN'],
      remarks: 'Additional KYC documents required',
      priority: 'low'
    },
    {
      id: 4,
      customerName: 'Neha Gupta',
      phone: '+91 9876543213',
      email: 'neha.gupta@email.com',
      productType: 'Savings Account',
      productName: 'SBI Savings Account',
      applicationId: 'SA112233',
      submittedDate: '2024-10-15',
      status: 'final_approval',
      estimatedCompletion: '2024-10-22',
      documents: ['Aadhar', 'PAN', 'Address Proof'],
      remarks: 'Pending final branch approval',
      priority: 'high'
    },
    {
      id: 5,
      customerName: 'Ravi Verma',
      phone: '+91 9876543214',
      email: 'ravi.verma@email.com',
      productType: 'Credit Card',
      productName: 'Axis Bank Magnus',
      applicationId: 'CC445566',
      submittedDate: '2024-10-14',
      status: 'document_review',
      estimatedCompletion: '2024-10-21',
      documents: ['Aadhar', 'PAN', 'ITR'],
      remarks: 'Income verification in progress',
      priority: 'medium'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'document_review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'bank_verification': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'kyc_pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'final_approval': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const filteredAccounts = pendingAccounts.filter(account => {
    const matchesSearch = account.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.productName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || account.status === filterStatus;
    const matchesType = filterType === 'all' || account.productType === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const statusCounts = {
    all: pendingAccounts.length,
    document_review: pendingAccounts.filter(a => a.status === 'document_review').length,
    bank_verification: pendingAccounts.filter(a => a.status === 'bank_verification').length,
    kyc_pending: pendingAccounts.filter(a => a.status === 'kyc_pending').length,
    final_approval: pendingAccounts.filter(a => a.status === 'final_approval').length
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Clock3 className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Pending Accounts</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Total Pending</h3>
          <p className="text-lg sm:text-2xl font-bold text-orange-600">{statusCounts.all}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Doc Review</h3>
          <p className="text-lg sm:text-2xl font-bold text-yellow-600">{statusCounts.document_review}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Verification</h3>
          <p className="text-lg sm:text-2xl font-bold text-blue-600">{statusCounts.bank_verification}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">KYC Pending</h3>
          <p className="text-lg sm:text-2xl font-bold text-orange-600">{statusCounts.kyc_pending}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 col-span-2 sm:col-span-1">
          <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Final Approval</h3>
          <p className="text-lg sm:text-2xl font-bold text-green-600">{statusCounts.final_approval}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, application ID, or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="document_review">Document Review</option>
              <option value="bank_verification">Bank Verification</option>
              <option value="kyc_pending">KYC Pending</option>
              <option value="final_approval">Final Approval</option>
            </select>
          </div>
          
          {/* Product Type Filter */}
          <div className="sm:w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Products</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Demat Account">Demat Account</option>
              <option value="Savings Account">Savings Account</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pending Accounts List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            Pending Applications ({filteredAccounts.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Application ID</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Priority</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Submitted</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Est. Completion</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          {account.customerName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {account.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          {account.productName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {account.productType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className="text-xs sm:text-sm font-mono text-gray-900 dark:text-white">
                      {account.applicationId}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                      {formatStatus(account.status)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(account.priority)}`}>
                      {account.priority.charAt(0).toUpperCase() + account.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {new Date(account.submittedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {new Date(account.estimatedCompletion).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs sm:text-sm">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredAccounts.length === 0 && (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No pending accounts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingAccount;
