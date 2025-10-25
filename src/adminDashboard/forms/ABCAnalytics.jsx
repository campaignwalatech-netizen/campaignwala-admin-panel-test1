import { BarChart3, TrendingUp, Users, DollarSign, Download, Filter, Calendar, CheckCircle, XCircle, Clock, Ban, CalendarDays, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ABCAnalytics() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
  const [selectionMode, setSelectionMode] = useState('range'); // 'single' or 'range'
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualStartDate, setManualStartDate] = useState('');
  const [manualEndDate, setManualEndDate] = useState('');
  const calendarRef = useRef(null);

  // Search functionality state
  const [searchTerm, setSearchTerm] = useState('');

  // Calendar helper functions
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isSameDay = (date1, date2) => {
    return date1 && date2 && 
           date1.getDate() === date2.getDate() && 
           date1.getMonth() === date2.getMonth() && 
           date1.getFullYear() === date2.getFullYear();
  };

  const isDateInRange = (date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (selectionMode === 'single') {
      // Single date selection mode
      setSelectedStartDate(clickedDate);
      setSelectedEndDate(null);
      setIsSelectingEndDate(false);
    } else {
      // Range selection mode
      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        // Start new selection
        setSelectedStartDate(clickedDate);
        setSelectedEndDate(null);
        setIsSelectingEndDate(true);
      } else if (isSelectingEndDate) {
        // Set end date
        if (clickedDate >= selectedStartDate) {
          setSelectedEndDate(clickedDate);
          setIsSelectingEndDate(false);
        } else {
          // If clicked date is before start date, make it the new start date
          setSelectedStartDate(clickedDate);
          setSelectedEndDate(null);
        }
      }
    }
  };

  const clearDateSelection = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setIsSelectingEndDate(false);
  };

  const toggleSelectionMode = () => {
    const newMode = selectionMode === 'single' ? 'range' : 'single';
    setSelectionMode(newMode);
    // Clear selections when switching modes
    clearDateSelection();
  };

  const handleManualDateInput = (value, isEndDate = false) => {
    if (isEndDate) {
      setManualEndDate(value);
      if (value) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          setSelectedEndDate(date);
        }
      }
    } else {
      setManualStartDate(value);
      if (value) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          setSelectedStartDate(date);
          if (selectionMode === 'single') {
            setSelectedEndDate(null);
          }
        }
      }
    }
  };

  const applyManualDates = () => {
    setShowManualInput(false);
    setShowCalendar(false);
  };

  const toggleInputMethod = () => {
    setShowManualInput(!showManualInput);
    if (!showManualInput) {
      // When switching to manual input, populate with current selected dates
      if (selectedStartDate) {
        setManualStartDate(selectedStartDate.toISOString().split('T')[0]);
      }
      if (selectedEndDate) {
        setManualEndDate(selectedEndDate.toISOString().split('T')[0]);
      }
    }
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExport = () => {
    console.log("Exporting analytics...");
    alert("Export functionality will be implemented soon!");
  };

  const stats = [
    { label: "Total Leads", value: "1,234", change: "+12%", icon: Users, color: "bg-blue-500" },
    { label: "Conversion Rate", value: "68%", change: "+5%", icon: TrendingUp, color: "bg-green-500" },
    { label: "Revenue", value: "₹12,50,000", change: "+18%", icon: DollarSign, color: "bg-purple-500" },
    { label: "Active Campaigns", value: "45", change: "+3", icon: BarChart3, color: "bg-orange-500" },
  ];

  const statusStats = [
    { label: "Approved", value: "856", change: "+8%", icon: CheckCircle, color: "bg-green-500" },
    { label: "Pending", value: "234", change: "-2%", icon: Clock, color: "bg-yellow-500" },
    { label: "Rejected", value: "89", change: "+5%", icon: XCircle, color: "bg-red-500" },
    { label: "Cancelled", value: "55", change: "-10%", icon: Ban, color: "bg-gray-500" },
  ];

  const leadData = [
    { month: "Jan", leads: 85, conversions: 58 },
    { month: "Feb", leads: 92, conversions: 65 },
    { month: "Mar", leads: 78, conversions: 52 },
    { month: "Apr", leads: 105, conversions: 72 },
    { month: "May", leads: 120, conversions: 85 },
    { month: "Jun", leads: 135, conversions: 95 },
  ];

  // Sample user data for search
  const sampleUsers = [
    { id: 'U001', name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '+91 9876543210', location: 'Mumbai, Maharashtra', totalSpent: '₹15,000', campaigns: 8 },
    { id: 'U002', name: 'Priya Sharma', email: 'priya.sharma@gmail.com', phone: '+91 8765432109', location: 'Delhi, Delhi', totalSpent: '₹8,500', campaigns: 5 },
    { id: 'U003', name: 'Amit Singh', email: 'amit.singh@yahoo.com', phone: '+91 7654321098', location: 'Bangalore, Karnataka', totalSpent: '₹22,300', campaigns: 12 },
    { id: 'U004', name: 'Sneha Gupta', email: 'sneha@hotmail.com', phone: '+91 6543210987', location: 'Pune, Maharashtra', totalSpent: '₹5,200', campaigns: 3 },
    { id: 'U005', name: 'Vikash Patel', email: 'vikash.patel@gmail.com', phone: '+91 5432109876', location: 'Ahmedabad, Gujarat', totalSpent: '₹18,700', campaigns: 9 }
  ];

  // Filter data based on search term
  const filteredUsers = sampleUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col p-3 sm:p-4">
      {/* Header with Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">ABC Analytics Dashboard</h2>

      {/* Filters and Export in one line */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Date Range Filter with Calendar */}
        <div className="relative" ref={calendarRef}>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-foreground hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/40 dark:hover:to-indigo-900/40 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
          >
            <CalendarDays className="w-5 h-5 text-blue-600" />
            <div className="text-left">
              <div className="text-sm font-semibold">
                {selectionMode === 'single' ? 'Single Date' : 'Date Range'}
              </div>
              <div className="text-xs text-muted-foreground">
                {selectionMode === 'single' 
                  ? (selectedStartDate 
                    ? formatDate(selectedStartDate) 
                    : "Select a date")
                  : (selectedStartDate && selectedEndDate 
                    ? `${formatDate(selectedStartDate)} - ${formatDate(selectedEndDate)}`
                    : selectedStartDate 
                    ? `From ${formatDate(selectedStartDate)}`
                    : "Select date range")
                }
              </div>
            </div>
            <Filter className="w-4 h-4 text-blue-600" />
          </button>

          {/* Calendar Popup */}
          {showCalendar && (
            <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 p-4 w-80">
              {/* Selection Mode Toggle */}
              <div className="flex items-center justify-center mb-4">
                <div className="bg-muted rounded-lg p-1 flex">
                  <button
                    onClick={() => setSelectionMode('single')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      selectionMode === 'single' 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Single Date
                  </button>
                  <button
                    onClick={() => setSelectionMode('range')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      selectionMode === 'range' 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Date Range
                  </button>
                </div>
              </div>

              {/* Input Method Toggle */}
              <div className="flex items-center justify-center mb-4">
                <button
                  onClick={toggleInputMethod}
                  className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                >
                  {showManualInput ? '📅 Use Calendar' : '✏️ Manual Input'}
                </button>
              </div>

              {/* Manual Input Section */}
              {showManualInput ? (
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {selectionMode === 'single' ? 'Select Date' : 'Start Date'}
                    </label>
                    <input
                      type="date"
                      value={manualStartDate}
                      onChange={(e) => handleManualDateInput(e.target.value, false)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  {selectionMode === 'range' && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={manualEndDate}
                        onChange={(e) => handleManualDateInput(e.target.value, true)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={applyManualDates}
                      className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      Apply Dates
                    </button>
                    <button
                      onClick={clearDateSelection}
                      className="px-4 py-2 border border-border text-muted-foreground rounded-lg text-sm hover:text-foreground hover:bg-muted transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-4">
                    <button 
                      onClick={() => navigateMonth(-1)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <h3 className="text-lg font-semibold text-foreground">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button 
                      onClick={() => navigateMonth(1)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
                
                {/* Empty cells for days before month starts */}
                {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, index) => (
                  <div key={`empty-${index}`} className="h-8"></div>
                ))}
                
                {/* Days of the month */}
                {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, index) => {
                  const day = index + 1;
                  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                  const isStart = isSameDay(date, selectedStartDate);
                  const isEnd = isSameDay(date, selectedEndDate);
                  const isInRange = selectionMode === 'range' && isDateInRange(date);
                  const isSelected = selectionMode === 'single' && isStart;
                  const isToday = isSameDay(date, new Date());
                  
                  return (
                    <button
                      key={day}
                      onClick={() => handleDateClick(day)}
                      className={`h-8 w-8 text-sm rounded-lg transition-all duration-150 ${
                        isSelected || isStart || isEnd
                          ? 'bg-primary text-primary-foreground font-semibold shadow-md'
                          : isInRange
                          ? 'bg-primary/20 text-primary font-medium'
                          : isToday
                          ? 'bg-muted text-foreground font-semibold border-2 border-primary'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
                  </div>

                  {/* Calendar Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <button
                      onClick={clearDateSelection}
                      className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear
                    </button>
                    <div className="text-xs text-muted-foreground">
                      {selectionMode === 'single' 
                        ? 'Select a date' 
                        : (isSelectingEndDate ? 'Select end date' : 'Select start date')
                      }
                    </div>
                    <button
                      onClick={() => setShowCalendar(false)}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Search Filter */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users, categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-6 py-3 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          style={{ 
            backgroundColor: '#4406CB',
            borderColor: '#4406CB'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#3905B8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#4406CB'}
        >
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Content with scroll */}
      <div className="flex-1 overflow-y-auto scrollbar-custom min-h-0 space-y-4">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-card rounded-lg border border-border p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`${stat.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 whitespace-nowrap">{stat.value}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Status Stats Grid */}
      <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">Offers Status Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statusStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-background rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`text-xs font-semibold whitespace-nowrap ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1 whitespace-nowrap">{stat.value}</h3>
                <p className="text-xs text-muted-foreground whitespace-nowrap">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lead Performance Table */}
      <div className="bg-card rounded-lg border border-border p-4 sm:p-6 overflow-x-auto scrollbar-custom">
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 whitespace-nowrap">Monthly Lead Performance</h3>
        <table className="w-full min-w-[480px]">
          <thead className="bg-muted">
            <tr>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase whitespace-nowrap">Month</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase whitespace-nowrap">Total Leads</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase whitespace-nowrap">Conversions</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase whitespace-nowrap">Conversion Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leadData.map((data, index) => (
              <tr key={index} className="hover:bg-muted/50">
                <td className="px-3 sm:px-4 py-3 text-sm font-medium text-foreground whitespace-nowrap">{data.month}</td>
                <td className="px-3 sm:px-4 py-3 text-sm text-foreground whitespace-nowrap">{data.leads}</td>
                <td className="px-3 sm:px-4 py-3 text-sm text-foreground whitespace-nowrap">{data.conversions}</td>
                <td className="px-3 sm:px-4 py-3 text-sm whitespace-nowrap">
                  <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-semibold whitespace-nowrap">
                    {Math.round((data.conversions / data.leads) * 100)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

    </div>
  );
}
