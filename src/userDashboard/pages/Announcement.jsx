import React from 'react';
import { Megaphone, Calendar } from 'lucide-react';

const Announcement = () => {
  const announcements = [
    {
      id: 1,
      title: 'New Campaign Launch - Credit Cards',
      content: 'We are excited to announce our new credit card campaign with increased rewards!',
      date: '2024-10-19',
      priority: 'high',
      type: 'campaign'
    },
    {
      id: 2,
      title: 'Weekly Meeting Schedule',
      content: 'Weekly team meeting scheduled for every Monday at 10:00 AM.',
      date: '2024-10-18',
      priority: 'medium',
      type: 'meeting'
    },
    {
      id: 3,
      title: 'Performance Bonus Update',
      content: 'Performance bonus calculation updated. Check your dashboard for details.',
      date: '2024-10-17',
      priority: 'high',
      type: 'bonus'
    },
    {
      id: 4,
      title: 'System Maintenance Notice',
      content: 'Scheduled maintenance on Sunday 2:00 AM - 4:00 AM. Services may be unavailable.',
      date: '2024-10-16',
      priority: 'low',
      type: 'maintenance'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Announcements</h1>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white pr-2">
                {announcement.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(announcement.priority)} flex-shrink-0`}>
                  {announcement.priority.toUpperCase()}
                </span>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
              {announcement.content}
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(announcement.date).toLocaleDateString()}</span>
              </div>
              <span className="capitalize bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded w-fit">
                {announcement.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;