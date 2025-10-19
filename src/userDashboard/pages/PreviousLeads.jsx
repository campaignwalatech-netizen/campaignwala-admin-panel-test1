import React, { useState } from 'react';
import { Users, Search, Filter, Calendar, Eye, Download, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';

const PreviousLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const previousLeadsData = [
    {
      id: 1,
      customerName: 'Rajesh Kumar',
      email: 'rajesh.kumar@gmail.com',
      phone: '+91 9876543210',
      service: 'Digital Marketing',
      source: 'Website',
      status: 'converted',
      value: 25000,
      assignedDate: '2024-10-01',
      followUpDate: '2024-10-03',
      notes: 'Interested in complete digital marketing package',
      priority: 'high',
      stage: 'closed-won',
      duration: '5 days'
    },
    {
      id: 2,
      customerName: 'Priya Sharma',
      email: 'priya.sharma@yahoo.com',
      phone: '+91 8765432109',
      service: 'Social Media Marketing',
      source: 'Facebook Ad',
      status: 'lost',
      value: 15000,
      assignedDate: '2024-09-28',
      followUpDate: '2024-10-01',
      notes: 'Budget constraints, may consider in future',
      priority: 'medium',
      stage: 'closed-lost',
      duration: '8 days'
    },
    {
      id: 3,
      customerName: 'Amit Patel',
      email: 'amit.patel@gmail.com',
      phone: '+91 7654321098',
      service: 'SEO Services',
      source: 'Google Ad',
      status: 'converted',
      value: 18000,
      assignedDate: '2024-09-25',
      followUpDate: '2024-09-27',
      notes: 'Small business owner, quick decision maker',
      priority: 'high',
      stage: 'closed-won',
      duration: '3 days'
    },
    {
      id: 4,
      customerName: 'Sneha Gupta',
      email: 'sneha.gupta@hotmail.com',
      phone: '+91 6543210987',
      service: 'Content Marketing',
      source: 'Referral',
      status: 'converted',
      value: 22000,
      assignedDate: '2024-09-20',
      followUpDate: '2024-09-22',
      notes: 'Referred by existing client, very satisfied',
      priority: 'high',
      stage: 'closed-won',
      duration: '4 days'
    },
    {
      id: 5,
      customerName: 'Vikram Singh',
      email: 'vikram.singh@gmail.com',
      phone: '+91 5432109876',
      service: 'PPC Campaign',
      source: 'LinkedIn',
      status: 'lost',
      value: 30000,
      assignedDate: '2024-09-15',
      followUpDate: '2024-09-18',
      notes: 'Went with competitor, price was main factor',
      priority: 'high',
      stage: 'closed-lost',
      duration: '10 days'
    },
    {
      id: 6,
      customerName: 'Meera Joshi',
      email: 'meera.joshi@gmail.com',
      phone: '+91 4321098765',
      service: 'Email Marketing',
      source: 'Website',
      status: 'converted',
      value: 12000,
      assignedDate: '2024-09-10',
      followUpDate: '2024-09-12',
      notes: 'Small campaign, very responsive client',
      priority: 'medium',
      stage: 'closed-won',
      duration: '6 days'
    },
    {
      id: 7,
      customerName: 'Rohit Verma',
      email: 'rohit.verma@yahoo.com',
      phone: '+91 3210987654',
      service: 'Brand Strategy',
      source: 'Cold Call',
      status: 'lost',
      value: 45000,
      assignedDate: '2024-09-05',
      followUpDate: '2024-09-08',
      notes: 'Timeline mismatch, needed immediate start',
      priority: 'high',
      stage: 'closed-lost',
      duration: '12 days'
    },
    {
      id: 8,
      customerName: 'Anita Reddy',
      email: 'anita.reddy@gmail.com',
      phone: '+91 2109876543',
      service: 'Web Development',
      source: 'Google Ad',
      status: 'converted',
      value: 35000,
      assignedDate: '2024-08-30',
      followUpDate: '2024-09-02',
      notes: 'E-commerce website with payment gateway',
      priority: 'high',
      stage: 'closed-won',
      duration: '7 days'
    }
  ];

  const filteredLeads = previousLeadsData.filter(lead => {
    const matchesSearch = lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    const matchesDate = dateFilter === 'all' || (() => {
      const leadDate = new Date(lead.assignedDate);
      const now = new Date();
      switch (dateFilter) {
        case 'week': return (now - leadDate) <= 7 * 24 * 60 * 60 * 1000;
        case 'month': return (now - leadDate) <= 30 * 24 * 60 * 60 * 1000;
        case 'quarter': return (now - leadDate) <= 90 * 24 * 60 * 60 * 1000;
        default: return true;
      }
    })();
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    switch (sortBy) {
      case 'date': return new Date(b.assignedDate) - new Date(a.assignedDate);
      case 'value': return b.value - a.value;
      case 'name': return a.customerName.localeCompare(b.customerName);
      case 'status': return a.status.localeCompare(b.status);
      default: return 0;
    }
  });

  const totalLeads = filteredLeads.length;
  const convertedLeads = filteredLeads.filter(lead => lead.status === 'converted').length;
  const lostLeads = filteredLeads.filter(lead => lead.status === 'lost').length;
  const totalValue = filteredLeads.filter(lead => lead.status === 'converted').reduce((sum, lead) => sum + lead.value, 0);
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  const getStatusColor = (status) => {
    switch (status) {
      case 'converted': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'lost': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
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

  const getSourceIcon = (source) => {
    switch (source.toLowerCase()) {
      case 'website': return '🌐';
      case 'facebook ad': return '📘';
      case 'google ad': return '🔍';
      case 'linkedin': return '💼';
      case 'referral': return '👥';
      case 'cold call': return '📞';
      default: return '📊';
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Previous Leads</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Total Leads</h3>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{totalLeads}</p>
            </div>
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Converted</h3>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{convertedLeads}</p>
            </div>
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Lost Leads</h3>
              <p className="text-xl sm:text-2xl font-bold text-red-600">{lostLeads}</p>
            </div>
            <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Conversion Rate</h3>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">{conversionRate}%</p>
            </div>
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm opacity-90">Total Revenue Generated</h3>
            <p className="text-lg sm:text-xl font-bold">₹{totalValue.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-sm opacity-90">Average Deal Size</h3>
            <p className="text-lg sm:text-xl font-bold">₹{convertedLeads > 0 ? Math.round(totalValue / convertedLeads).toLocaleString() : '0'}</p>
          </div>
          <div>
            <h3 className="text-sm opacity-90">Leads This Period</h3>
            <p className="text-lg sm:text-xl font-bold">{totalLeads} leads</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="value">Sort by Value</option>
            <option value="name">Sort by Name</option>
            <option value="status">Sort by Status</option>
          </select>

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            Previous Leads ({sortedLeads.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Service</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Source</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Value</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Priority</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {sortedLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                        {lead.customerName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {lead.email}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {lead.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900 dark:text-white">
                      {lead.service}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getSourceIcon(lead.source)}</span>
                      <span className="text-xs sm:text-sm text-gray-900 dark:text-white">
                        {lead.source}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                      ₹{lead.value.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(lead.priority)}`}>
                      {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">
                    {lead.duration}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900 dark:text-white">
                      {new Date(lead.assignedDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Follow-up: {new Date(lead.followUpDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button 
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                        title="Download Report"
                      >
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

      {sortedLeads.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No leads found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default PreviousLeads;