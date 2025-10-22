import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Users, ClipboardList, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const [stats] = useState({ total: 24, open: 9, resolved: 4, inReview: 11 });
  const [reports] = useState([
    {
      id: 1,
      title: "Illegal garbage dumping near bus stop",
      location: "Sector 5, Main Road",
      status: "Resolved",
      date: "20 Oct 2025",
    },
    {
      id: 2,
      title: "Broken streetlight at central park",
      location: "KIIT Square",
      status: "In Review",
      date: "19 Oct 2025",
    },
    {
      id: 3,
      title: "Water logging on main street",
      location: "Nandankanan Road",
      status: "Open",
      date: "18 Oct 2025",
    },
  ]);

  const pieData = [
    { name: "Open", value: stats.open },
    { name: "In Review", value: stats.inReview },
    { name: "Resolved", value: stats.resolved },
  ];

  const COLORS = ["#FACC15", "#60A5FA", "#4ADE80"];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        Admin Panel - Clean Street
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-lg">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <ClipboardList className="text-green-600 mb-2" size={30} />
            <h2 className="text-lg font-semibold">Total Issues</h2>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <AlertCircle className="text-yellow-500 mb-2" size={30} />
            <h2 className="text-lg font-semibold">Open</h2>
            <p className="text-2xl font-bold">{stats.open}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Users className="text-blue-500 mb-2" size={30} />
            <h2 className="text-lg font-semibold">In Review</h2>
            <p className="text-2xl font-bold">{stats.inReview}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <CheckCircle className="text-green-600 mb-2" size={30} />
            <h2 className="text-lg font-semibold">Resolved</h2>
            <p className="text-2xl font-bold">{stats.resolved}</p>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart Section */}
      <Card className="shadow-lg mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">System Overview</h2>
          <div className="flex justify-center">
            <PieChart width={400} height={250}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Manage Complaints</h2>
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-green-100">
              <tr>
                <th className="p-3 text-left">Issue</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{report.title}</td>
                  <td className="p-3">{report.location}</td>
                  <td
                    className={`p-3 font-medium ${
                      report.status === "Resolved"
                        ? "text-green-600"
                        : report.status === "Open"
                        ? "text-yellow-500"
                        : "text-blue-500"
                    }`}
                  >
                    {report.status}
                  </td>
                  <td className="p-3">{report.date}</td>
                  <td className="p-3">
                    <Button variant="outline" size="sm" className="text-green-700">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}