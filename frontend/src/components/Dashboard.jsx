import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "../api"; // Make sure this is correctly configured

function Dashboard({ user }) {
const [selectedCompany, setSelectedCompany] = useState("APPLE");
const [combinedData, setCombinedData] = useState([]);


useEffect(() => {
  api
    .get(`/combined-chart-data?company=${selectedCompany}`)
    .then((res) => setCombinedData(res.data))
    .catch((err) => console.error("Failed to fetch combined chart data:", err));
}, [selectedCompany]);

return (
  <div className="min-h-screen bg-gray-100 px-4 py-8">
    {/* Header */}
  <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 px-1">
    {/* Dashboard Title */}
    <div className="flex items-center space-x-3">
      <div className="bg-indigo-100 text-indigo-600 rounded-full p-2">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3v18h18M9 17V9M15 17V5"
          />
        </svg>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 tracking-tight">
        Dashboard
      </h1>
    </div>

    {/* User Greeting */}
    <div className="mt-4 md:mt-0">
      <p className="text-lg font-semibold text-gray-700">
        Welcome, <span className="text-indigo-600">{user.full_name}</span>
      </p>
    </div>
  </header>


    {/* Company Selector + Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Company Selector */}
      <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-center items-center col-span-1 md:col-span-2 md:col-start-2 mx-auto w-full max-w-sm">
        <label className="text-sm font-medium text-gray-600 mb-2 text-center">
          Select Company
        </label>
        <select
          className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="APPLE">APPLE</option>
          <option value="MICROSOFT">MICROSOFT</option>
          <option value="GOOGLE">GOOGLE</option>
          <option value="TESLA">TESLA</option>
          <option value="NVIDIA">NVIDIA</option>
        </select>
      </div>



      {/* User Info Cards */}
      {/* <div className="bg-white p-6 rounded-2xl shadow-md">
        <p className="text-sm text-gray-500 mb-1">Username</p>
        <h2 className="text-lg font-semibold text-gray-800">{user.username}</h2>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <p className="text-sm text-gray-500 mb-1">Email</p>
        <h2 className="text-lg font-semibold text-gray-800">{user.email}</h2>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <p className="text-sm text-gray-500 mb-1">Status</p>
        <h2 className="text-lg font-semibold text-green-600">Active</h2>
      </div> */}
    </div>

    {/* Chart */}
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8 overflow-x-hidden w-full">
      <h3 className="text-xl font-semibold mb-4 text-indigo-600">
        {selectedCompany} – Predictions
      </h3>
      {combinedData.length > 0 ? (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={combinedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="Date" tick={{ fontSize: 12 }} />
            <YAxis
              domain={["auto", "auto"]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{ fontSize: "14px" }}
              formatter={(value, name) => [`$${value}`, name]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="Actual"
              stroke="#6366F1"
              strokeWidth={2}
              dot={false}
              name="Actual"
            />
            <Line
              type="monotone"
              dataKey="Predicted"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
              name="Predicted"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-sm">Loading combined chart data...</p>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Account Balance */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-indigo-600 mb-2">Account Balance</h3>
        <p className="text-3xl font-bold text-gray-800">
          ₹ {user.balance?.toLocaleString("en-IN") ?? "1,00,00,000.00"}
        </p>
        <p className="text-sm text-gray-500 mt-1">Available balance in your trading wallet</p>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-center">
        <h3 className="text-xl font-semibold mb-4 text-indigo-600">Recent Activity</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✔️ Logged in</li>
        </ul>
      </div>
    </div>

  </div>
);



}

export default Dashboard;
