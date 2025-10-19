import React from 'react';
import { CalendarCheck, Calendar, CheckCircle, XCircle } from 'lucide-react';

const Attendance = () => {
  const attendanceData = [
    { date: '2024-10-19', status: 'present', checkIn: '09:30 AM', checkOut: '06:30 PM' },
    { date: '2024-10-18', status: 'present', checkIn: '09:15 AM', checkOut: '06:45 PM' },
    { date: '2024-10-17', status: 'present', checkIn: '09:45 AM', checkOut: '06:15 PM' },
    { date: '2024-10-16', status: 'absent', checkIn: '-', checkOut: '-' },
    { date: '2024-10-15', status: 'present', checkIn: '09:20 AM', checkOut: '06:30 PM' },
    { date: '2024-10-14', status: 'present', checkIn: '09:35 AM', checkOut: '06:40 PM' },
    { date: '2024-10-13', status: 'present', checkIn: '09:25 AM', checkOut: '06:20 PM' },
  ];

  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const presentDays = attendanceData.filter(day => day.status === 'present').length;
  const totalDays = attendanceData.length;
  const attendancePercentage = Math.round((presentDays / totalDays) * 100);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Attendance Record</h1>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">This Month</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{currentMonth}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Present Days</h3>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{presentDays} / {totalDays}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Attendance Rate</h3>
          <p className="text-xl sm:text-2xl font-bold text-blue-600">{attendancePercentage}%</p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Check In</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Check Out</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {attendanceData.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {record.status === 'present' ? (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === 'present' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                    {record.checkIn}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                    {record.checkOut}
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

export default Attendance;