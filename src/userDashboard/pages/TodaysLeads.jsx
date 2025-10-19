import React from 'react';
import { PhoneCall, Clock, CheckCircle, User, Phone } from 'lucide-react';

const TodaysLeads = () => {
  const todaysLeads = [
    {
      id: 1,
      name: 'Rakesh Sharma',
      phone: '+91 9876543210',
      product: 'Credit Card',
      status: 'pending',
      time: '09:30 AM',
      notes: 'Interested in premium card'
    },
    {
      id: 2,
      name: 'Priya Singh',
      phone: '+91 9876543211',
      product: 'Personal Loan',
      status: 'contacted',
      time: '10:15 AM',
      notes: 'Requested callback'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      phone: '+91 9876543212',
      product: 'Demat Account',
      status: 'completed',
      time: '11:00 AM',
      notes: 'Application submitted'
    },
    {
      id: 4,
      name: 'Neha Gupta',
      phone: '+91 9876543213',
      product: 'Savings Account',
      status: 'pending',
      time: '02:30 PM',
      notes: 'Documents required'
    },
    {
      id: 5,
      name: 'Ravi Verma',
      phone: '+91 9876543214',
      product: 'Credit Card',
      status: 'contacted',
      time: '03:45 PM',
      notes: 'Follow up scheduled'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'contacted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'contacted': return <Phone className="w-4 h-4 text-blue-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const totalLeads = todaysLeads.length;
  const completedLeads = todaysLeads.filter(lead => lead.status === 'completed').length;
  const pendingLeads = todaysLeads.filter(lead => lead.status === 'pending').length;

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Today's Leads</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Leads</h3>
          <p className="text-xl sm:text-2xl font-bold text-blue-600">{totalLeads}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Completed</h3>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{completedLeads}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Pending</h3>
          <p className="text-xl sm:text-2xl font-bold text-yellow-600">{pendingLeads}</p>
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {todaysLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          {lead.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-300">
                          {lead.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">
                    {lead.product}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 sm:gap-2">
                      {getStatusIcon(lead.status)}
                      <span className={`px-1.5 sm:px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                    {lead.time}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-300 hidden sm:table-cell">
                    {lead.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodaysLeads;