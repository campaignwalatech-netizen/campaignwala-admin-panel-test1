import React, { useState } from 'react';
import { IndianRupee, Calendar, Download, TrendingUp, CreditCard, Filter, Eye } from 'lucide-react';

const SalaryReceived = () => {
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterYear, setFilterYear] = useState('2024');

  const salaryData = [
    {
      id: 1,
      month: 'October 2024',
      baseSalary: 25000,
      commissions: 8500,
      bonuses: 2000,
      deductions: 1200,
      netSalary: 34300,
      paymentDate: '2024-10-15',
      status: 'paid',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN001234567',
      leads: 15,
      conversionRate: 85
    },
    {
      id: 2,
      month: 'September 2024',
      baseSalary: 25000,
      commissions: 7200,
      bonuses: 1500,
      deductions: 1100,
      netSalary: 32600,
      paymentDate: '2024-09-15',
      status: 'paid',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN001234566',
      leads: 12,
      conversionRate: 80
    },
    {
      id: 3,
      month: 'August 2024',
      baseSalary: 25000,
      commissions: 9800,
      bonuses: 3000,
      deductions: 1300,
      netSalary: 36500,
      paymentDate: '2024-08-15',
      status: 'paid',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN001234565',
      leads: 18,
      conversionRate: 90
    },
    {
      id: 4,
      month: 'July 2024',
      baseSalary: 25000,
      commissions: 6500,
      bonuses: 1000,
      deductions: 1000,
      netSalary: 31500,
      paymentDate: '2024-07-15',
      status: 'paid',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN001234564',
      leads: 10,
      conversionRate: 75
    },
    {
      id: 5,
      month: 'June 2024',
      baseSalary: 25000,
      commissions: 5200,
      bonuses: 500,
      deductions: 900,
      netSalary: 29800,
      paymentDate: '2024-06-15',
      status: 'paid',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN001234563',
      leads: 8,
      conversionRate: 70
    }
  ];

  const currentMonth = salaryData[0]; // Latest month data

  const filteredData = salaryData.filter(salary => {
    if (filterMonth === 'all') return true;
    return salary.month.toLowerCase().includes(filterMonth.toLowerCase());
  });

  const totalEarnings = filteredData.reduce((sum, salary) => sum + salary.netSalary, 0);
  const totalCommissions = filteredData.reduce((sum, salary) => sum + salary.commissions, 0);
  const avgConversion = Math.round(filteredData.reduce((sum, salary) => sum + salary.conversionRate, 0) / filteredData.length);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Salary Received</h1>
      </div>

      {/* Current Month Highlight */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h3 className="text-sm opacity-90">Current Month</h3>
            <p className="text-lg sm:text-xl font-bold">{currentMonth.month}</p>
          </div>
          <div>
            <h3 className="text-sm opacity-90">Net Salary</h3>
            <p className="text-lg sm:text-xl font-bold">₹{currentMonth.netSalary.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-sm opacity-90">Commission</h3>
            <p className="text-lg sm:text-xl font-bold">₹{currentMonth.commissions.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-sm opacity-90">Leads Converted</h3>
            <p className="text-lg sm:text-xl font-bold">{currentMonth.leads}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Total Earnings</h3>
              <p className="text-xl sm:text-2xl font-bold text-green-600">₹{totalEarnings.toLocaleString()}</p>
            </div>
            <IndianRupee className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Total Commissions</h3>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">₹{totalCommissions.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Avg Conversion</h3>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">{avgConversion}%</p>
            </div>
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Months Paid</h3>
              <p className="text-xl sm:text-2xl font-bold text-orange-600">{filteredData.length}</p>
            </div>
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-48">
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Months</option>
                <option value="october">October 2024</option>
                <option value="september">September 2024</option>
                <option value="august">August 2024</option>
                <option value="july">July 2024</option>
                <option value="june">June 2024</option>
              </select>
            </div>
            
            <div className="sm:w-32">
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium">
            <Download className="w-4 h-4" />
            Download Payslips
          </button>
        </div>
      </div>

      {/* Salary History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Salary History</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Month</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Base Salary</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Commission</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Bonus</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Deductions</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Net Salary</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {filteredData.map((salary) => (
                <tr key={salary.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          {salary.month}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Paid: {new Date(salary.paymentDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">
                    ₹{salary.baseSalary.toLocaleString()}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-semibold text-green-600">
                    ₹{salary.commissions.toLocaleString()}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-blue-600">
                    ₹{salary.bonuses.toLocaleString()}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-red-600">
                    -₹{salary.deductions.toLocaleString()}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                      ₹{salary.netSalary.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {salary.leads} leads ({salary.conversionRate}%)
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(salary.status)}`}>
                      {salary.status.charAt(0).toUpperCase() + salary.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-xs">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Method Info */}
      <div className="mt-4 sm:mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <CreditCard className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Payment Information
            </h3>
            <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-200 mb-2">
              Salary is credited to your linked bank account on the 15th of every month.
            </p>
            <div className="text-xs text-blue-600 dark:text-blue-300">
              <p><strong>Account:</strong> HDFC Bank - ****5678</p>
              <p><strong>Payment Method:</strong> NEFT/RTGS Transfer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryReceived;