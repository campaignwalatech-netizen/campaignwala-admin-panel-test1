import React, { useState, useEffect } from 'react';
import { Users, Trophy, TrendingUp, Clock, Star } from 'lucide-react';

const LiveToppersList = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const liveToppers = [
    {
      id: 1,
      rank: 1,
      name: 'Rajesh Kumar',
      todayLeads: 15,
      conversionRate: 87,
      earnings: '₹4,500',
      status: 'active',
      lastActivity: '2 min ago',
      avatar: 'RK'
    },
    {
      id: 2,
      rank: 2,
      name: 'Priya Sharma',
      todayLeads: 12,
      conversionRate: 83,
      earnings: '₹3,800',
      status: 'active',
      lastActivity: '5 min ago',
      avatar: 'PS'
    },
    {
      id: 3,
      rank: 3,
      name: 'Amit Singh',
      todayLeads: 11,
      conversionRate: 79,
      earnings: '₹3,200',
      status: 'active',
      lastActivity: '8 min ago',
      avatar: 'AS'
    },
    {
      id: 4,
      rank: 4,
      name: 'Neha Gupta',
      todayLeads: 9,
      conversionRate: 75,
      earnings: '₹2,800',
      status: 'active',
      lastActivity: '12 min ago',
      avatar: 'NG'
    },
    {
      id: 5,
      rank: 5,
      name: 'Rahul Verma',
      todayLeads: 8,
      conversionRate: 72,
      earnings: '₹2,400',
      status: 'active',
      lastActivity: '15 min ago',
      avatar: 'RV'
    },
    {
      id: 6,
      rank: 6,
      name: 'Sita Patel',
      todayLeads: 7,
      conversionRate: 68,
      earnings: '₹2,100',
      status: 'active',
      lastActivity: '18 min ago',
      avatar: 'SP'
    },
    {
      id: 7,
      rank: 7,
      name: 'Karan Joshi',
      todayLeads: 6,
      conversionRate: 65,
      earnings: '₹1,800',
      status: 'away',
      lastActivity: '25 min ago',
      avatar: 'KJ'
    },
    {
      id: 8,
      rank: 8,
      name: 'Anita Roy',
      todayLeads: 5,
      conversionRate: 62,
      earnings: '₹1,500',
      status: 'away',
      lastActivity: '32 min ago',
      avatar: 'AR'
    }
  ];

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-yellow-500 text-white';
      case 2: return 'bg-gray-400 text-white';
      case 3: return 'bg-amber-600 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
  };

  const getStatusIcon = (status) => {
    return status === 'active' ? '🟢' : '🟡';
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Live Toppers List</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Last updated: {currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Active Users</h3>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                {liveToppers.filter(t => t.status === 'active').length}
              </p>
            </div>
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Total Leads Today</h3>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">
                {liveToppers.reduce((sum, topper) => sum + topper.todayLeads, 0)}
              </p>
            </div>
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Avg Conversion</h3>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">
                {Math.round(liveToppers.reduce((sum, t) => sum + t.conversionRate, 0) / liveToppers.length)}%
              </p>
            </div>
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">Top Earner</h3>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600">{liveToppers[0]?.earnings}</p>
            </div>
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Live Toppers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Real-time Rankings</h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Updated every minute</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rank</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Agent</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Today's Leads</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Conversion</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Earnings</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {liveToppers.map((topper) => (
                <tr key={topper.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full font-bold text-xs sm:text-sm ${getRankColor(topper.rank)}`}>
                        {topper.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-semibold text-blue-600">{topper.avatar}</span>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          {topper.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {topper.lastActivity}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-blue-600">{topper.todayLeads}</span>
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-12 sm:w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${topper.conversionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                        {topper.conversionRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-semibold text-green-600 dark:text-green-400">
                    {topper.earnings}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>{getStatusIcon(topper.status)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(topper.status)}`}>
                        {topper.status.charAt(0).toUpperCase() + topper.status.slice(1)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="mt-4 sm:mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">Live Activity Feed</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm text-green-800 dark:text-green-200">
              <strong>Rajesh Kumar</strong> converted a lead for Credit Card - ₹300 earned
            </span>
            <span className="text-xs text-green-600 ml-auto">Just now</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
              <strong>Priya Sharma</strong> received a new lead for Personal Loan
            </span>
            <span className="text-xs text-blue-600 ml-auto">2 min ago</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-xs sm:text-sm text-purple-800 dark:text-purple-200">
              <strong>Amit Singh</strong> reached 80% conversion rate milestone
            </span>
            <span className="text-xs text-purple-600 ml-auto">5 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveToppersList;
