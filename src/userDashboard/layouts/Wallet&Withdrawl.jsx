import React, { useState } from "react";

const WalletAndWithdrawl = ({ darkMode }) => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawals, setWithdrawals] = useState([
    { id: "WDR-001", amount: 500, date: "2024-07-20", status: "Approved", admin: "Admin A" },
    { id: "WDR-002", amount: 120, date: "2024-07-18", status: "Pending", admin: "N/A" },
    { id: "WDR-003", amount: 75.5, date: "2024-07-15", status: "Rejected", admin: "Admin B" },
    { id: "WDR-004", amount: 300, date: "2024-07-12", status: "Approved", admin: "Admin C" },
    { id: "WDR-005", amount: 80, date: "2024-07-10", status: "Pending", admin: "N/A" },
  ]);

  const handleWithdraw = () => {
    if (!withdrawAmount || isNaN(withdrawAmount)) return alert("Enter a valid amount!");
    const newRequest = {
      id: `WDR-00${withdrawals.length + 1}`,
      amount: parseFloat(withdrawAmount),
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      admin: "N/A",
    };
    setWithdrawals([newRequest, ...withdrawals]);
    setWithdrawAmount("");
    alert("Withdrawal request submitted!");
  };

  return (
    <div
      className={`min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-10 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Balance Card */}
        <div
          className={`border rounded-2xl p-6 sm:p-8 shadow-sm text-center sm:text-left ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <p className="text-sm text-gray-500 mb-1">Current Available Balance</p>
          <h2 className="text-4xl font-semibold mb-1">$1,250.75</h2>
          <p className="text-xs text-gray-400">Last updated: July 22, 2024</p>
        </div>

        {/* Withdrawal Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left - Initiate Withdrawal */}
          <div
            className={`border rounded-2xl p-6 sm:p-8 shadow-sm ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <h3 className="text-lg font-semibold mb-4">Initiate Withdrawal</h3>
            <label className="block text-sm mb-2 text-gray-500">
              Amount to Withdraw (USD)
            </label>
            <input
              type="text"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="e.g., 500.00"
              className={`w-full p-3 border rounded-md mb-4 text-sm outline-none ${
                darkMode
                  ? "bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
            <button
              onClick={handleWithdraw}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition"
            >
              REQUEST WITHDRAWAL
            </button>
          </div>

          {/* Right - Important Note */}
          <div
            className={`border rounded-2xl p-6 sm:p-8 shadow-sm ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <h3 className="text-lg font-semibold mb-4">Important Note</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              All withdrawal requests are subject to admin review and approval,
              and will be processed within 24–48 hours. <br />
              <br />
              Please ensure your bank details are updated in your profile
              settings to avoid delays.
            </p>
          </div>
        </div>

        {/* Withdrawal History Table */}
        <div
          className={`border rounded-2xl p-6 sm:p-8 shadow-sm ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Withdrawal History</h3>

          {/* Table Wrapper for Mobile Scroll */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr
                  className={`text-left ${
                    darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <th className="py-3 px-4 font-semibold whitespace-nowrap">Request ID</th>
                  <th className="py-3 px-4 font-semibold whitespace-nowrap">Amount (USD)</th>
                  <th className="py-3 px-4 font-semibold whitespace-nowrap">Date</th>
                  <th className="py-3 px-4 font-semibold whitespace-nowrap">Status</th>
                  <th className="py-3 px-4 font-semibold whitespace-nowrap">Processed By</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w) => (
                  <tr
                    key={w.id}
                    className={`border-t hover:bg-gray-50 transition ${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-700/40"
                        : "border-gray-200"
                    }`}
                  >
                    <td className="py-3 px-4">{w.id}</td>
                    <td className="py-3 px-4">${w.amount.toFixed(2)}</td>
                    <td className="py-3 px-4">{w.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          w.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : w.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {w.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{w.admin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WalletAndWithdrawl;