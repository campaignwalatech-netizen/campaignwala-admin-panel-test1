import React from 'react';
import { Trophy } from 'lucide-react';

const MonthlyWinnerList = () => {
  const winners = [
    { rank: 1, name: 'Rajesh Kumar', earnings: '₹50,000', leads: 245 },
    { rank: 2, name: 'Priya Sharma', earnings: '₹45,000', leads: 220 },
    { rank: 3, name: 'Amit Singh', earnings: '₹40,000', leads: 195 },
    { rank: 4, name: 'Neha Gupta', earnings: '₹35,000', leads: 170 },
    { rank: 5, name: 'Rahul Verma', earnings: '₹30,000', leads: 155 },
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Monthly Winner List</h1>
      </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rank</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Earnings</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Leads</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {winners.map((winner) => (
                  <tr key={winner.rank} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-white font-bold text-xs sm:text-sm ${
                          winner.rank === 1 ? 'bg-yellow-500' : 
                          winner.rank === 2 ? 'bg-gray-400' : 
                          winner.rank === 3 ? 'bg-amber-600' : 'bg-blue-500'
                        }`}>
                          {winner.rank}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                      {winner.name}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-green-600 dark:text-green-400 font-semibold">
                      {winner.earnings}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                      {winner.leads}
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

export default MonthlyWinnerList;