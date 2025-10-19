import React, { useState } from 'react';
import { Link2, CreditCard, Building, Shield, Plus, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';

const AccountLink = () => {
  const [showAccountNumber, setShowAccountNumber] = useState({});
  const [activeTab, setActiveTab] = useState('bank');

  const linkedAccounts = [
    {
      id: 1,
      type: 'bank',
      bankName: 'HDFC Bank',
      accountNumber: '1234567890123456',
      accountType: 'Savings',
      status: 'verified',
      linkedDate: '2024-10-15',
      isDefault: true
    },
    {
      id: 2,
      type: 'upi',
      provider: 'Google Pay',
      upiId: 'user@googlepy',
      status: 'verified',
      linkedDate: '2024-10-10',
      isDefault: false
    }
  ];

  const [bankForm, setBankForm] = useState({
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    accountType: 'savings',
    accountHolderName: ''
  });

  const [upiForm, setUpiForm] = useState({
    upiId: '',
    provider: ''
  });

  const toggleAccountVisibility = (accountId) => {
    setShowAccountNumber(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return '';
    return accountNumber.replace(/(.{4})(.*)(.{4})/, '$1****$3');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <Check className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const handleBankSubmit = (e) => {
    e.preventDefault();
    console.log('Bank form submitted:', bankForm);
    // Handle bank account linking
  };

  const handleUpiSubmit = (e) => {
    e.preventDefault();
    console.log('UPI form submitted:', upiForm);
    // Handle UPI linking
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Link2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Account Link</h1>
        <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs px-2 py-1 rounded-full font-medium">
          New
        </span>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Secure Account Linking
            </h3>
            <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-200">
              Link your bank account or UPI to receive payments directly. All your financial information is encrypted and secure.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Linked Accounts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Linked Accounts</h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your payment methods</p>
          </div>
          
          <div className="p-4 sm:p-6 space-y-4">
            {linkedAccounts.length === 0 ? (
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-500 dark:text-gray-400">No accounts linked yet</p>
              </div>
            ) : (
              linkedAccounts.map((account) => (
                <div key={account.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {account.type === 'bank' ? (
                        <Building className="w-5 h-5 text-blue-600" />
                      ) : (
                        <CreditCard className="w-5 h-5 text-green-600" />
                      )}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {account.type === 'bank' ? account.bankName : account.provider}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {account.type === 'bank' ? account.accountType : 'UPI ID'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {account.isDefault && (
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(account.status)}`}>
                        {getStatusIcon(account.status)}
                        {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {account.type === 'bank' ? (
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                          Account: {showAccountNumber[account.id] ? account.accountNumber : maskAccountNumber(account.accountNumber)}
                        </span>
                        <button
                          onClick={() => toggleAccountVisibility(account.id)}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {showAccountNumber[account.id] ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        UPI ID: {account.upiId}
                      </p>
                    )}
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Linked on: {new Date(account.linkedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add New Account */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Add New Account</h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Link a new payment method</p>
          </div>
          
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('bank')}
                className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'bank'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <Building className="w-4 h-4 mx-auto mb-1" />
                Bank Account
              </button>
              <button
                onClick={() => setActiveTab('upi')}
                className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'upi'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <CreditCard className="w-4 h-4 mx-auto mb-1" />
                UPI
              </button>
            </nav>
          </div>
          
          <div className="p-4 sm:p-6">
            {activeTab === 'bank' ? (
              <form onSubmit={handleBankSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Account Holder Name *
                  </label>
                  <input
                    type="text"
                    value={bankForm.accountHolderName}
                    onChange={(e) => setBankForm({...bankForm, accountHolderName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full name as per bank"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bank Name *
                  </label>
                  <select
                    value={bankForm.bankName}
                    onChange={(e) => setBankForm({...bankForm, bankName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Bank</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="SBI">State Bank of India</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Bank">Kotak Mahindra Bank</option>
                    <option value="Yes Bank">Yes Bank</option>
                    <option value="Punjab National Bank">Punjab National Bank</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    value={bankForm.accountNumber}
                    onChange={(e) => setBankForm({...bankForm, accountNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter account number"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Account Number *
                  </label>
                  <input
                    type="text"
                    value={bankForm.confirmAccountNumber}
                    onChange={(e) => setBankForm({...bankForm, confirmAccountNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Re-enter account number"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    IFSC Code *
                  </label>
                  <input
                    type="text"
                    value={bankForm.ifscCode}
                    onChange={(e) => setBankForm({...bankForm, ifscCode: e.target.value.toUpperCase()})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter IFSC code"
                    maxLength="11"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Account Type *
                  </label>
                  <select
                    value={bankForm.accountType}
                    onChange={(e) => setBankForm({...bankForm, accountType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="savings">Savings Account</option>
                    <option value="current">Current Account</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Link Bank Account
                </button>
              </form>
            ) : (
              <form onSubmit={handleUpiSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    UPI ID *
                  </label>
                  <input
                    type="text"
                    value={upiForm.upiId}
                    onChange={(e) => setUpiForm({...upiForm, upiId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="yourname@upi"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    UPI Provider *
                  </label>
                  <select
                    value={upiForm.provider}
                    onChange={(e) => setUpiForm({...upiForm, provider: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Provider</option>
                    <option value="Google Pay">Google Pay</option>
                    <option value="PhonePe">PhonePe</option>
                    <option value="Paytm">Paytm</option>
                    <option value="BHIM">BHIM</option>
                    <option value="Amazon Pay">Amazon Pay</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Link UPI Account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLink;
