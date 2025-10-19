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
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <CalendarCheck className="w-6 h-6 text-green-500" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance Record</h1>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">This Month</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{currentMonth}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Present Days</h3>
          <p className="text-2xl font-bold text-green-600">{presentDays} / {totalDays}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Attendance Rate</h3>
          <p className="text-2xl font-bold text-blue-600">{attendancePercentage}%</p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Check Out</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {attendanceData.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {record.status === 'present' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === 'present' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {record.checkIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
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