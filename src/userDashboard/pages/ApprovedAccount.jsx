import React, { useState } from 'react';
import { ShieldCheck, Search, Eye, User, CreditCard, Calendar, CheckCircle, Award } from 'lucide-react';

const ApprovedAccount = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const approvedAccounts = [
    {
      id: 1,
      customerName: 'Rajesh Kumar',
      phone: '+91 9876543210',
      email: 'rajesh.kumar@email.com',
      productType: 'Credit Card',
      productName: 'HDFC Regalia',
      applicationId: 'CC001234',
      submittedDate: '2024-10-10',
      approvedDate: '2024-10-18',
      creditLimit: '₹5,00,000',
      commission: '₹1,500',
      status: 'card_dispatched',
      bankOfficer: 'Mr. Sharma',
      approvalLevel: 'Final Approval'
    },
    {
      id: 2,
      customerName: 'Priya Sharma',
      phone: '+91 9876543211',
      email: 'priya.sharma@email.com',
      productType: 'Personal Loan',
      productName: 'ICICI Personal Loan',
      applicationId: 'PL005678',
      submittedDate: '2024-10-12',
      approvedDate: '2024-10-19',
      loanAmount: '₹3,00,000',
      commission: '₹2,000',
      status: 'disbursal_pending',
      bankOfficer: 'Ms. Patel',
      approvalLevel: 'Final Approval'
    },
    {
      id: 3,
      customerName: 'Amit Singh',
      phone: '+91 9876543212',
      email: 'amit.singh@email.com',
      productType: 'Demat Account',
      productName: 'Zerodha Demat',
      applicationId: 'DM009876',
      submittedDate: '2024-10-08',
      approvedDate: '2024-10-16',
      accountNumber: 'ZR123456789',
      commission: '₹750',
      status: 'account_active',
      bankOfficer: 'Mr. Gupta',
      approvalLevel: 'Auto Approval'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'account_active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'card_dispatched': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'disbursal_pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const filteredAccounts = approvedAccounts.filter(account => {
    const matchesSearch = account.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.productName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || account.productType === filterType;
    
    return matchesSearch && matchesType;
  });

  const totalCommission = filteredAccounts.reduce((sum, account) => {
    return sum + parseInt(account.commission.replace('₹', '').replace(',', ''));
  }, 0);

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Approved Accounts</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Total Approved</h3>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{filteredAccounts.length}</p>
            </div>
            <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Active Accounts</h3>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">
                {filteredAccounts.filter(a => a.status === 'account_active').length}
              </p>
            </div>
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Commission Earned</h3>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">₹{totalCommission.toLocaleString()}</p>
            </div>
            <Award className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">This Month</h3>
              <p className="text-xl sm:text-2xl font-bold text-orange-600">
                {filteredAccounts.filter(a => new Date(a.approvedDate).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
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

      {/* Approved Accounts List */}
      <div className="space-y-4">
        {filteredAccounts.map((account) => (
          <div key={account.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Customer Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {account.customerName}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{account.phone}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{account.email}</p>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{account.productName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{account.productType}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                    {formatStatus(account.status)}
                  </span>
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
                    <Eye className="w-4 h-4" />
                    Details
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Application ID</p>
                    <p className="font-medium text-gray-900 dark:text-white">{account.applicationId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Approved Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(account.approvedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      {account.productType === 'Credit Card' ? 'Credit Limit' : 
                       account.productType === 'Personal Loan' ? 'Loan Amount' : 'Account Number'}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {account.creditLimit || account.loanAmount || account.accountNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Commission</p>
                    <p className="font-medium text-green-600">{account.commission}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Bank Officer</p>
                    <p className="font-medium text-gray-900 dark:text-white">{account.bankOfficer}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Approval Level</p>
                    <p className="font-medium text-gray-900 dark:text-white">{account.approvalLevel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAccounts.length === 0 && (
        <div className="text-center py-8">
          <ShieldCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-500 dark:text-gray-400">No approved accounts found</p>
        </div>
      )}
    </div>
  );
};

export default ApprovedAccount;
