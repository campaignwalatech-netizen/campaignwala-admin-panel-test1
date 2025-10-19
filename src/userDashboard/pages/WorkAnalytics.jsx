import React from 'react';
import { LineChart, TrendingUp, BarChart3, Calendar } from 'lucide-react';

const WorkAnalytics = () => {
  const analytics = {
    totalLeads: 156,
    convertedLeads: 89,
    conversionRate: 57,
    monthlyEarnings: 25000,
    weeklyTarget: 40,
    weeklyAchievement: 32
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <LineChart className="w-6 h-6 text-purple-500" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Work Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Leads</h3>
              <p className="text-2xl font-bold text-blue-600">{analytics.totalLeads}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Converted</h3>
              <p className="text-2xl font-bold text-green-600">{analytics.convertedLeads}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Conversion Rate</h3>
              <p className="text-2xl font-bold text-purple-600">{analytics.conversionRate}%</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Overview</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">Weekly Target Progress</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {analytics.weeklyAchievement}/{analytics.weeklyTarget}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(analytics.weeklyAchievement / analytics.weeklyTarget) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkAnalytics;