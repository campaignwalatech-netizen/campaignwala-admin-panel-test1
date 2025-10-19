import React, { useState } from 'react';
import { CheckCircle2, Search, Download, Eye, User, CreditCard, Calendar, DollarSign, Filter } from 'lucide-react';

const CompletedAccount = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');

  const completedAccounts = [
    {
      id: 1,
      customerName: 'Rajesh Kumar',
      phone: '+91 9876543210',
      email: 'rajesh.kumar@email.com',
      productType: 'Credit Card',
      productName: 'HDFC Regalia',
      applicationId: 'CC001234',
      submittedDate: '2024-09-15',
      completedDate: '2024-09-25',
      commission: '₹1,500',
      bankReferenceId: 'HDFC123456789',
      status: 'active',
      processingDays: 10,
      customerRating: 5
    },
    {
      id: 2,
      customerName: 'Priya Sharma',
      phone: '+91 9876543211',
      email: 'priya.sharma@email.com',
      productType: 'Personal Loan',
      productName: 'ICICI Personal Loan',
      applicationId: 'PL005678',
      submittedDate: '2024-09-10',
      completedDate: '2024-09-20',
      commission: '₹2,000',
      bankReferenceId: 'ICICI987654321',
      status: 'active',
      processingDays: 10,
      customerRating: 4
    },
    {
      id: 3,
      customerName: 'Amit Singh',
      phone: '+91 9876543212',
      email: 'amit.singh@email.com',
      productType: 'Demat Account',
      productName: 'Zerodha Demat',
      applicationId: 'DM009876',
      submittedDate: '2024-09-05',
      completedDate: '2024-09-12',
      commission: '₹750',
      bankReferenceId: 'ZER456789123',
      status: 'active',
      processingDays: 7,
      customerRating: 5
    },
    {
      id: 4,
      customerName: 'Neha Gupta',
      phone: '+91 9876543213',
      email: 'neha.gupta@email.com',
      productType: 'Savings Account',
      productName: 'SBI Savings Account',
      applicationId: 'SA112233',
      submittedDate: '2024-08-20',
      completedDate: '2024-08-28',
      commission: '₹500',
      bankReferenceId: 'SBI789123456',
      status: 'active',
      processingDays: 8,
      customerRating: 4
    },
    {
      id: 5,
      customerName: 'Ravi Verma',
      phone: '+91 9876543214',
      email: 'ravi.verma@email.com',
      productType: 'Credit Card',
      productName: 'Axis Bank Magnus',
      applicationId: 'CC445566',
      submittedDate: '2024-08-15',
      completedDate: '2024-08-25',
      commission: '₹1,800',
      bankReferenceId: 'AXIS321654987',
      status: 'active',
      processingDays: 10,
      customerRating: 5
    },
    {
      id: 6,
      customerName: 'Sita Patel',
      phone: '+91 9876543215',
      email: 'sita.patel@email.com',
      productType: 'Personal Loan',
      productName: 'Kotak Personal Loan',
      applicationId: 'PL778899',
      submittedDate: '2024-08-01',
      completedDate: '2024-08-12',
      commission: '₹2,200',
      bankReferenceId: 'KOT654987321',
      status: 'active',
      processingDays: 11,
      customerRating: 4
    }
  ];

  const getProductIcon = (productType) => {
    switch (productType) {
      case 'Credit Card': return <CreditCard className="w-4 h-4 text-blue-600" />;
      case 'Personal Loan': return <DollarSign className="w-4 h-4 text-green-600" />;
      case 'Demat Account': return <CreditCard className="w-4 h-4 text-purple-600" />;
      case 'Savings Account': return <CreditCard className="w-4 h-4 text-orange-600" />;
      default: return <CreditCard className="w-4 h-4 text-gray-600" />;
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const filteredAccounts = completedAccounts.filter(account => {
    const matchesSearch = account.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.productName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || account.productType === filterType;
    
    const accountMonth = new Date(account.completedDate).getMonth() + 1;
    const matchesMonth = filterMonth === 'all' || parseInt(filterMonth) === accountMonth;
    
    return matchesSearch && matchesType && matchesMonth;
  });

  const totalCommission = filteredAccounts.reduce((sum, account) => {
    return sum + parseInt(account.commission.replace('₹', '').replace(',', ''));
  }, 0);

  const avgProcessingDays = Math.round(
    filteredAccounts.reduce((sum, account) => sum + account.processingDays, 0) / filteredAccounts.length
  );

  const avgRating = (
    filteredAccounts.reduce((sum, account) => sum + account.customerRating, 0) / filteredAccounts.length
  ).toFixed(1);

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Completed Accounts</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Total Completed</h3>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{filteredAccounts.length}</p>
            </div>
            <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Total Commission</h3>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">₹{totalCommission.toLocaleString()}</p>
            </div>
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Avg Processing</h3>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">{avgProcessingDays} days</p>
            </div>
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Avg Rating</h3>
              <div className="flex items-center gap-2">
                <p className="text-xl sm:text-2xl font-bold text-yellow-600">{avgRating}</p>
                <div className="flex">{renderStars(Math.round(avgRating))}</div>
              </div>
            </div>
          </div>
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
          
          {/* Month Filter */}
          <div className="sm:w-48">
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Months</option>
              <option value="10">October 2024</option>
              <option value="9">September 2024</option>
              <option value="8">August 2024</option>
              <option value="7">July 2024</option>
            </select>
          </div>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm font-medium">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Completed Accounts List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            Completed Applications ({filteredAccounts.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Application ID</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Completed Date</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Commission</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Processing Days</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rating</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
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
                      {getProductIcon(account.productType)}
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
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {new Date(account.completedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className="text-xs sm:text-sm font-semibold text-green-600 dark:text-green-400">
                      {account.commission}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      account.processingDays <= 7 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : account.processingDays <= 10
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {account.processingDays} days
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {renderStars(account.customerRating)}
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        ({account.customerRating})
                      </span>
                    </div>
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
            <CheckCircle2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No completed accounts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedAccount;
