import React, { useState } from 'react';
import { Archive, Search, Filter, Calendar, Eye, Download, TrendingUp, CheckCircle, XCircle, Award, AlertCircle } from 'lucide-react';

const ClosedLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [reasonFilter, setReasonFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const closedLeadsData = [
    {
      id: 1,
      customerName: 'Rajesh Kumar',
      email: 'rajesh.kumar@gmail.com',
      phone: '+91 9876543210',
      service: 'Digital Marketing',
      source: 'Website',
      status: 'won',
      value: 25000,
      assignedDate: '2024-10-01',
      closedDate: '2024-10-06',
      duration: '5 days',
      reason: 'Price competitive, good service presentation',
      notes: 'Client was impressed with our portfolio and pricing',
      nextSteps: 'Project kickoff scheduled',
      satisfaction: 5,
      learnings: 'Quick decision when value proposition is clear'
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
      closedDate: '2024-10-06',
      duration: '8 days',
      reason: 'Budget constraints',
      notes: 'Client interested but couldn\'t allocate budget this quarter',
      nextSteps: 'Follow up in Q1 2025',
      satisfaction: 3,
      learnings: 'Need to qualify budget earlier in process'
    },
    {
      id: 3,
      customerName: 'Amit Patel',
      email: 'amit.patel@gmail.com',
      phone: '+91 7654321098',
      service: 'SEO Services',
      source: 'Google Ad',
      status: 'won',
      value: 18000,
      assignedDate: '2024-09-25',
      closedDate: '2024-09-28',
      duration: '3 days',
      reason: 'Immediate need, quick decision',
      notes: 'Small business owner with urgent SEO requirements',
      nextSteps: 'Contract signed, project started',
      satisfaction: 5,
      learnings: 'Small businesses decide faster when need is urgent'
    },
    {
      id: 4,
      customerName: 'Sneha Gupta',
      email: 'sneha.gupta@hotmail.com',
      phone: '+91 6543210987',
      service: 'Content Marketing',
      source: 'Referral',
      status: 'won',
      value: 22000,
      assignedDate: '2024-09-20',
      closedDate: '2024-09-24',
      duration: '4 days',
      reason: 'Trust through referral, satisfied with proposal',
      notes: 'Referred by existing client who was very satisfied',
      nextSteps: 'Content strategy development phase',
      satisfaction: 5,
      learnings: 'Referrals have highest conversion rate'
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
      closedDate: '2024-09-25',
      duration: '10 days',
      reason: 'Competitor offered lower price',
      notes: 'Price was the main deciding factor, went with cheaper option',
      nextSteps: 'No immediate follow-up planned',
      satisfaction: 2,
      learnings: 'Need better value justification for premium pricing'
    },
    {
      id: 6,
      customerName: 'Meera Joshi',
      email: 'meera.joshi@gmail.com',
      phone: '+91 4321098765',
      service: 'Email Marketing',
      source: 'Website',
      status: 'won',
      value: 12000,
      assignedDate: '2024-09-10',
      closedDate: '2024-09-16',
      duration: '6 days',
      reason: 'Good fit for requirements, reasonable price',
      notes: 'Small campaign but client very responsive and engaged',
      nextSteps: 'Campaign setup in progress',
      satisfaction: 4,
      learnings: 'Smaller clients often more engaged in process'
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
      closedDate: '2024-09-17',
      duration: '12 days',
      reason: 'Timeline mismatch',
      notes: 'Needed immediate start but our team was unavailable',
      nextSteps: 'Keep in pipeline for future opportunities',
      satisfaction: 3,
      learnings: 'Resource planning crucial for large projects'
    },
    {
      id: 8,
      customerName: 'Anita Reddy',
      email: 'anita.reddy@gmail.com',
      phone: '+91 2109876543',
      service: 'Web Development',
      source: 'Google Ad',
      status: 'won',
      value: 35000,
      assignedDate: '2024-08-30',
      closedDate: '2024-09-06',
      duration: '7 days',
      reason: 'Technical expertise, good portfolio',
      notes: 'E-commerce project with complex payment integration',
      nextSteps: 'Development phase started',
      satisfaction: 5,
      learnings: 'Technical portfolio demonstrations are very effective'
    }
  ];

  const filteredLeads = closedLeadsData.filter(lead => {
    const matchesSearch = lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    const matchesReason = reasonFilter === 'all' || (() => {
      switch (reasonFilter) {
        case 'price': return lead.reason.toLowerCase().includes('price') || lead.reason.toLowerCase().includes('budget');
        case 'timeline': return lead.reason.toLowerCase().includes('timeline') || lead.reason.toLowerCase().includes('time');
        case 'competitor': return lead.reason.toLowerCase().includes('competitor');
        case 'technical': return lead.reason.toLowerCase().includes('technical') || lead.reason.toLowerCase().includes('expertise');
        default: return true;
      }
    })();
    
    const matchesDate = dateFilter === 'all' || (() => {
      const leadDate = new Date(lead.closedDate);
      const now = new Date();
      switch (dateFilter) {
        case 'week': return (now - leadDate) <= 7 * 24 * 60 * 60 * 1000;
        case 'month': return (now - leadDate) <= 30 * 24 * 60 * 60 * 1000;
        case 'quarter': return (now - leadDate) <= 90 * 24 * 60 * 60 * 1000;
        default: return true;
      }
    })();
    
    return matchesSearch && matchesStatus && matchesReason && matchesDate;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    switch (sortBy) {
      case 'date': return new Date(b.closedDate) - new Date(a.closedDate);
      case 'value': return b.value - a.value;
      case 'name': return a.customerName.localeCompare(b.customerName);
      case 'status': return a.status.localeCompare(b.status);
      case 'duration': return parseInt(a.duration) - parseInt(b.duration);
      default: return 0;
    }
  });

  const totalLeads = filteredLeads.length;
  const wonLeads = filteredLeads.filter(lead => lead.status === 'won').length;
  const lostLeads = filteredLeads.filter(lead => lead.status === 'lost').length;
  const totalWonValue = filteredLeads.filter(lead => lead.status === 'won').reduce((sum, lead) => sum + lead.value, 0);
  const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;
  const avgSatisfaction = filteredLeads.length > 0 ? 
    (filteredLeads.reduce((sum, lead) => sum + lead.satisfaction, 0) / filteredLeads.length).toFixed(1) : 0;

  const getStatusColor = (status) => {
    switch (status) {
      case 'won': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'lost': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getSatisfactionColor = (rating) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getReasonCategory = (reason) => {
    const lowerReason = reason.toLowerCase();
    if (lowerReason.includes('price') || lowerReason.includes('budget')) return 'Price/Budget';
    if (lowerReason.includes('timeline') || lowerReason.includes('time')) return 'Timeline';
    if (lowerReason.includes('competitor')) return 'Competition';
    if (lowerReason.includes('technical')) return 'Technical';
    return 'Other';
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Archive className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Closed Leads</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Total Closed</h3>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">{totalLeads}</p>
            </div>
            <Archive className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Won Deals</h3>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{wonLeads}</p>
            </div>
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Win Rate</h3>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{conversionRate}%</p>
            </div>
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Avg Satisfaction</h3>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600">{avgSatisfaction}/5</p>
            </div>
            <Award className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm opacity-90">Won Revenue</h3>
            <p className="text-lg sm:text-xl font-bold">₹{totalWonValue.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-sm opacity-90">Average Deal Size</h3>
            <p className="text-lg sm:text-xl font-bold">₹{wonLeads > 0 ? Math.round(totalWonValue / wonLeads).toLocaleString() : '0'}</p>
          </div>
          <div>
            <h3 className="text-sm opacity-90">Lost Opportunities</h3>
            <p className="text-lg sm:text-xl font-bold">{lostLeads} leads</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
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
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>

          <select
            value={reasonFilter}
            onChange={(e) => setReasonFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Reasons</option>
            <option value="price">Price/Budget</option>
            <option value="timeline">Timeline</option>
            <option value="competitor">Competition</option>
            <option value="technical">Technical</option>
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
            <option value="duration">Sort by Duration</option>
          </select>

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Closed Leads Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            Closed Leads ({sortedLeads.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Service</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Value</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reason</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Satisfaction</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Closed Date</th>
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
                        {lead.source}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900 dark:text-white">
                      {lead.service}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                      ₹{lead.value.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status === 'won' ? 'Won' : 'Lost'}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">
                    {lead.duration}
                  </td>
                  <td className="px-3 sm:px-6 py-4">
                    <div className="max-w-xs">
                      <div className="text-xs font-medium text-gray-900 dark:text-white mb-1">
                        {getReasonCategory(lead.reason)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate" title={lead.reason}>
                        {lead.reason}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span className={`text-xs sm:text-sm font-semibold ${getSatisfactionColor(lead.satisfaction)}`}>
                        {lead.satisfaction}/5
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xs ${i < lead.satisfaction ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900 dark:text-white">
                      {new Date(lead.closedDate).toLocaleDateString()}
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

      {/* Learnings & Insights */}
      <div className="mt-4 sm:mt-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
              Key Learnings & Insights
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-yellow-700 dark:text-yellow-200">
              <p>• Referrals have the highest conversion rate and satisfaction scores</p>
              <p>• Price competition is the primary reason for lost deals</p>
              <p>• Quick decision makers tend to be more satisfied with the service</p>
              <p>• Technical demonstrations are effective for complex service sales</p>
              <p>• Resource planning is crucial for large project opportunities</p>
            </div>
          </div>
        </div>
      </div>

      {sortedLeads.length === 0 && (
        <div className="text-center py-12">
          <Archive className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No closed leads found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ClosedLeads;