import React, { useState } from 'react';
import { Trophy, Medal, Star, TrendingUp, Users, Target, Award, Crown, Calendar, Filter } from 'lucide-react';

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState('month');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const leaderboardData = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      avatar: 'RK',
      position: 1,
      score: 2850,
      leads: 45,
      conversions: 38,
      revenue: 850000,
      conversionRate: 84.4,
      badges: ['Top Performer', 'Deal Closer', 'Revenue King'],
      level: 'Diamond',
      streak: 15,
      improvement: '+12%'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      avatar: 'PS',
      position: 2,
      score: 2720,
      leads: 42,
      conversions: 34,
      revenue: 780000,
      conversionRate: 81.0,
      badges: ['Consistent Performer', 'Client Favorite'],
      level: 'Platinum',
      streak: 12,
      improvement: '+8%'
    },
    {
      id: 3,
      name: 'Amit Patel',
      avatar: 'AP',
      position: 3,
      score: 2650,
      leads: 40,
      conversions: 32,
      revenue: 720000,
      conversionRate: 80.0,
      badges: ['Fast Closer', 'Quality Leads'],
      level: 'Platinum',
      streak: 10,
      improvement: '+15%'
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      avatar: 'SG',
      position: 4,
      score: 2480,
      leads: 38,
      conversions: 29,
      revenue: 650000,
      conversionRate: 76.3,
      badges: ['Team Player', 'Rising Star'],
      level: 'Gold',
      streak: 8,
      improvement: '+20%'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      avatar: 'VS',
      position: 5,
      score: 2350,
      leads: 35,
      conversions: 26,
      revenue: 580000,
      conversionRate: 74.3,
      badges: ['Persistent', 'Goal Achiever'],
      level: 'Gold',
      streak: 6,
      improvement: '+5%'
    },
    {
      id: 6,
      name: 'Meera Joshi',
      avatar: 'MJ',
      position: 6,
      score: 2180,
      leads: 32,
      conversions: 24,
      revenue: 520000,
      conversionRate: 75.0,
      badges: ['New Talent'],
      level: 'Silver',
      streak: 4,
      improvement: '+25%'
    },
    {
      id: 7,
      name: 'Rohit Verma',
      avatar: 'RV',
      position: 7,
      score: 2050,
      leads: 30,
      conversions: 21,
      revenue: 480000,
      conversionRate: 70.0,
      badges: ['Dedicated'],
      level: 'Silver',
      streak: 3,
      improvement: '+10%'
    },
    {
      id: 8,
      name: 'Anita Reddy',
      avatar: 'AR',
      position: 8,
      score: 1920,
      leads: 28,
      conversions: 19,
      revenue: 420000,
      conversionRate: 67.9,
      badges: ['Improving'],
      level: 'Bronze',
      streak: 2,
      improvement: '+18%'
    }
  ];

  // Current user data (assuming position 4)
  const currentUser = leaderboardData[3];

  const achievements = [
    { name: 'First Deal', icon: '🎯', description: 'Close your first deal', achieved: true },
    { name: '10 Deals', icon: '📈', description: 'Close 10 deals in a month', achieved: true },
    { name: '25 Deals', icon: '💪', description: 'Close 25 deals in a month', achieved: true },
    { name: '50 Deals', icon: '🚀', description: 'Close 50 deals in a month', achieved: false },
    { name: 'Top 3', icon: '🏆', description: 'Reach top 3 in leaderboard', achieved: false },
    { name: 'Revenue King', icon: '👑', description: 'Generate highest revenue', achieved: false },
    { name: 'Perfect Month', icon: '💎', description: '100% conversion rate', achieved: false },
    { name: 'Streak Master', icon: '🔥', description: '30-day winning streak', achieved: false }
  ];

  const getPositionIcon = (position) => {
    switch (position) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-gray-500">#{position}</span>;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Diamond': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Platinum': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Silver': return 'bg-gray-100 text-gray-600 dark:bg-gray-800/20 dark:text-gray-300';
      case 'Bronze': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getRowBgColor = (position, isCurrentUser = false) => {
    if (isCurrentUser) return 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500';
    if (position === 1) return 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20';
    if (position === 2) return 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20';
    if (position === 3) return 'bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20';
    return 'hover:bg-gray-50 dark:hover:bg-gray-700';
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
      </div>

      {/* Current User Highlight */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 text-white">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold">
              {currentUser.avatar}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Your Current Rank</h3>
              <p className="text-sm opacity-90">Keep pushing to reach the top!</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
            <div className="text-center">
              <p className="text-2xl font-bold">#{currentUser.position}</p>
              <p className="text-xs opacity-90">Position</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{currentUser.score}</p>
              <p className="text-xs opacity-90">Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{currentUser.conversions}</p>
              <p className="text-xs opacity-90">Conversions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{currentUser.improvement}</p>
              <p className="text-xs opacity-90">Growth</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* 2nd Place */}
        <div className="order-1 sm:order-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold text-gray-700 dark:text-gray-300 mx-auto mb-3">
            {leaderboardData[1].avatar}
          </div>
          <Medal className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{leaderboardData[1].name}</h3>
          <p className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-300">{leaderboardData[1].score}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">2nd Place</p>
        </div>

        {/* 1st Place */}
        <div className="order-2 sm:order-2 bg-gradient-to-b from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-lg shadow-md p-4 sm:p-6 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-yellow-300 dark:bg-yellow-600 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-yellow-800 dark:text-yellow-100 mx-auto mb-3">
            {leaderboardData[0].avatar}
          </div>
          <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{leaderboardData[0].name}</h3>
          <p className="text-2xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400">{leaderboardData[0].score}</p>
          <p className="text-xs text-gray-600 dark:text-gray-300">Champion 👑</p>
        </div>

        {/* 3rd Place */}
        <div className="order-3 sm:order-3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-200 dark:bg-amber-700 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold text-amber-800 dark:text-amber-100 mx-auto mb-3">
            {leaderboardData[2].avatar}
          </div>
          <Award className="w-6 h-6 text-amber-600 mx-auto mb-2" />
          <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">{leaderboardData[2].name}</h3>
          <p className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">{leaderboardData[2].score}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">3rd Place</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full sm:w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="leads">Most Leads</option>
              <option value="conversions">Best Conversion</option>
              <option value="revenue">Highest Revenue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4 sm:mb-6">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Full Rankings</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rank</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Score</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Leads</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Conversions</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Revenue</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Level</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {leaderboardData.map((user) => (
                <tr key={user.id} className={getRowBgColor(user.position, user.id === currentUser.id)}>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getPositionIcon(user.position)}
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        #{user.position}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-bold text-blue-800 dark:text-blue-200">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                          {user.id === currentUser.id && <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">(You)</span>}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {user.conversionRate}% conversion
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {user.score}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">
                      {user.improvement}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {user.leads}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 dark:text-green-400">
                    {user.conversions}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                    ₹{(user.revenue / 1000).toFixed(0)}K
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(user.level)}`}>
                      {user.level}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                        {user.streak}
                      </span>
                      <span className="text-orange-500">🔥</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Your Achievements
          </h2>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-3 sm:p-4 rounded-lg text-center ${
                  achievement.achieved
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <h3 className={`text-xs sm:text-sm font-semibold mb-1 ${
                  achievement.achieved ? 'text-green-800 dark:text-green-200' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {achievement.name}
                </h3>
                <p className={`text-xs ${
                  achievement.achieved ? 'text-green-600 dark:text-green-300' : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {achievement.description}
                </p>
                {achievement.achieved && (
                  <div className="mt-2">
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                      Unlocked
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;