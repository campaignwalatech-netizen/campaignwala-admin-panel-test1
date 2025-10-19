import { BarChart3, TrendingUp, Users, DollarSign, Download, Filter, Calendar } from "lucide-react";
import { useState } from "react";

export default function ABCAnalytics() {
  const [filterPeriod, setFilterPeriod] = useState("6months");

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

  const leadData = [
    { month: "Jan", leads: 85, conversions: 58 },
    { month: "Feb", leads: 92, conversions: 65 },
    { month: "Mar", leads: 78, conversions: 52 },
    { month: "Apr", leads: 105, conversions: 72 },
    { month: "May", leads: 120, conversions: 85 },
    { month: "Jun", leads: 135, conversions: 95 },
  ];

  return (
    <div className="h-full flex flex-col p-3 sm:p-4">
      {/* Header with Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">ABC Analytics Dashboard</h2>

      {/* Filters and Export in one line */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Period Filter */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="pl-9 pr-8 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Content with scroll */}
      <div className="flex-1 overflow-y-auto scrollbar-custom min-h-0 space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-card rounded-lg border border-border p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`${stat.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-green-600 whitespace-nowrap">{stat.change}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 whitespace-nowrap">{stat.value}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{stat.label}</p>
            </div>
          );
        })}
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
