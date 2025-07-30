import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "../api"; // Make sure this is correctly configured

function Dashboard({ user }) {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    api
      .get("/chart-data")
      .then((res) => {
        setActivityData(res.data); // expects [{ Date: ..., Close: ... }]
      })
      .catch((err) => {
        console.error("Failed to fetch chart data:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Dashboard</h1>
        <div className="text-right">
          <p className="font-medium text-gray-700">{user.full_name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Username</p>
          <h2 className="text-xl font-bold">{user.username}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Email</p>
          <h2 className="text-xl font-bold">{user.email}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Status</p>
          <h2 className="text-xl font-bold text-green-600">Active</h2>
        </div>
      </div>

      <div className="col-span-2 bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-2 text-indigo-600">AAPL</h3>
        {activityData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={activityData}
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
                formatter={(value) => [`$${value}`, "Close"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="Close"
                stroke="#6366F1"
                strokeWidth={2}
                dot={{ r: 1 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-sm">Loading chart data...</p>
        )}
      </div>
        {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-2 text-indigo-600">Recent Activity</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✔️ Logged in</li>
          <li>📧 Checked email settings</li>
          <li>📊 Viewed analytics</li>
          <li>🔒 Changed password</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
