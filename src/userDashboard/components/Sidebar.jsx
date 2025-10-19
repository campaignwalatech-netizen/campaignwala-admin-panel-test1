import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Trophy,
  Megaphone,
  CalendarCheck,
  Users,
  PhoneCall,
  Link2,
  LineChart,
  HelpCircle,
  Clock3,
  CheckCircle2,
  ShieldCheck,
  UserCircle2,
  IndianRupee,
  History,
  Archive,
  Medal
} from 'lucide-react';

const menuItems = [
  { label: 'Monthly Winner List', icon: Trophy, path: '/user/monthly-winners' },
  { label: 'Announcement', icon: Megaphone, path: '/user/announcements' },
  { label: 'Attendance', icon: CalendarCheck, path: '/user/attendance' },
  { label: 'Live Toppers List', icon: Users, path: '/user/live-toppers' },
  { label: "Today's Leads", icon: PhoneCall, path: '/user/todays-leads' },
  { label: 'Account Link', icon: Link2, path: '/user/account-link', badge: 'New' },
  { label: 'Work Analytics', icon: LineChart, path: '/user/work-analytics' },
  { label: "FAQ's", icon: HelpCircle, path: '/user/faq' },
  { label: 'Pending Account', icon: Clock3, path: '/user/pending-account' },
  { label: 'Completed Account', icon: CheckCircle2, path: '/user/completed-account' },
  { label: 'Approved Account', icon: ShieldCheck, path: '/user/approved-account' },
  { label: 'Profile Details', icon: UserCircle2, path: '/user/profile' },
  { label: 'Salary Received', icon: IndianRupee, path: '/user/salary' },
  { label: 'Previous Leads', icon: History, path: '/user/previous-leads' },
  { label: 'Closed Leads', icon: Archive, path: '/user/closed-leads' },
  { label: 'Leaderboard', icon: Medal, path: '/user/leaderboard' }
];

const Sidebar = ({ darkMode }) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 w-64 border-r z-40 overflow-y-auto ${
        darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}
    >
      <div className="px-5 py-4 border-b sticky top-0 bg-inherit">
        <Link to="/user/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold">
            CW
          </div>
          <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Campaign Wala
          </span>
        </Link>
      </div>

      <nav className="px-2 py-3">
        {menuItems.map(({ label, icon: Icon, badge, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={label}
              to={path}
              className={`w-full flex items-center justify-between rounded-md px-3 py-2 mb-1 text-sm transition-colors ${
                isActive
                  ? darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-700'
                  : darkMode
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </span>
              {badge && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600 text-white">{badge}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;