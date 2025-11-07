import React, { useEffect, useMemo, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import "./AdminDashboard.css";
import AdminSidebar from "./AdminSidebar";
import logo from "../assets/logo.jpeg";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function normalizeStatus(statusRaw) {
  const status = String(statusRaw || "").trim().toLowerCase();
  if (status === "closed" || status.includes("resolve")) return "Closed";
  if (status === "open") return "Open";
  return "Unknown";
}

function isDateToday(d) {
  try {
    const dt = new Date(d);
    const today = new Date();
    return (
      dt.getFullYear() === today.getFullYear() &&
      dt.getMonth() === today.getMonth() &&
      dt.getDate() === today.getDate()
    );
  } catch (e) {
    return false;
  }
}

const AdminReports = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5001/api/issues/all", {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error("Failed to fetch issues");
        const data = await res.json();
        setIssues(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || "Failed to load reports");
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, [token]);

  const { statusCounts, priorityCounts, total, open, closed, closedToday } = useMemo(() => {
    const statuses = { Open: 0, Closed: 0, Unknown: 0 };
    const priorities = {};
    let totalCount = 0;
    let openCount = 0;
    let closedCount = 0;
    let closedTodayCount = 0;

    for (const issue of issues) {
      totalCount += 1;
      
      // Status counts
      const bucket = normalizeStatus(issue?.status);
      statuses[bucket] = (statuses[bucket] || 0) + 1;
      if (bucket === "Open") openCount += 1;
      if (bucket === "Closed") {
        closedCount += 1;
        if (isDateToday(issue?.createdAt)) closedTodayCount += 1;
      }

      // Priority counts
      const priority = issue?.priority || "Unknown";
      priorities[priority] = (priorities[priority] || 0) + 1;
    }

    return {
      statusCounts: statuses,
      priorityCounts: priorities,
      total: totalCount,
      open: openCount,
      closed: closedCount,
      closedToday: closedTodayCount,
    };
  }, [issues]);

  // Status Distribution Doughnut Chart
  const statusDoughnutData = useMemo(() => {
    const labels = Object.keys(statusCounts).filter(k => statusCounts[k] > 0);
    const values = labels.map(k => statusCounts[k]);
    const colors = {
      Open: "#e76f51",
      Closed: "#2a9d8f",
      Unknown: "#94a3b8"
    };
    
    return {
      labels: labels,
      datasets: [
        {
          label: "Complaints",
          data: values,
          backgroundColor: labels.map(l => colors[l] || "#94a3b8"),
          borderWidth: 0,
        },
      ],
    };
  }, [statusCounts]);

  // Priority Distribution Doughnut Chart
  const priorityDoughnutData = useMemo(() => {
    const labels = Object.keys(priorityCounts).filter(k => priorityCounts[k] > 0);
    const values = labels.map(k => priorityCounts[k]);
    const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"];
    
    return {
      labels: labels,
      datasets: [
        {
          label: "Priority",
          data: values,
          backgroundColor: labels.map((_, i) => colors[i % colors.length]),
          borderWidth: 0,
        },
      ],
    };
  }, [priorityCounts]);

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: "right",
        labels: {
          font: { size: 12 },
          padding: 12
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: "60%",
  };

  // Summary Bar Chart
  const barData = useMemo(() => {
    return {
      labels: ["Total", "Open", "Closed", "Closed Today"],
      datasets: [
        {
          label: "Count",
          data: [total, open, closed, closedToday],
          backgroundColor: ["#3b82f6", "#e76f51", "#2a9d8f", "#8b5cf6"],
          borderRadius: 6,
          barThickness: 40,
        },
      ],
    };
  }, [total, open, closed, closedToday]);

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: { 
        beginAtZero: true, 
        ticks: { 
          precision: 0,
          font: { size: 11 }
        },
        grid: {
          color: "#f1f5f9"
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: { size: 11 }
        }
      }
    },
  };

  if (loading) {
    return (
      <div className="admin-page">
        <AdminSidebar logo={logo} />
        <div className="admin-main">
          <div style={{ padding: 24 }}>Loading reports...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <AdminSidebar logo={logo} />
        <div className="admin-main">
          <div style={{ padding: 24, color: "red" }}>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <AdminSidebar logo={logo} />
      <div className="admin-main">
        <header className="admin-top">
          <h1>Reports & Analytics</h1>
        </header>

        {/* Summary Stats */}
        <section className="admin-stats-row">
          <div className="admin-stat-card">
            <div className="stat-label">Total Complaints</div>
            <div className="stat-value">{total}</div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-label">Open</div>
            <div className="stat-value" style={{ color: "#e76f51" }}>{open}</div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-label">Closed</div>
            <div className="stat-value" style={{ color: "#2a9d8f" }}>{closed}</div>
          </div>
          <div className="admin-stat-card">
            <div className="stat-label">Closed Today</div>
            <div className="stat-value" style={{ color: "#8b5cf6" }}>{closedToday}</div>
          </div>
        </section>

        {/* Charts Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 20, marginTop: 10 }}>
          {/* Status Distribution */}
          <div className="card" style={{ minHeight: 320 }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: 16, fontWeight: 600, color: "#1a2a1a" }}>
              Status Distribution
            </h3>
            <div style={{ height: 260 }}>
              <Doughnut data={statusDoughnutData} options={{...doughnutOptions, plugins: {...doughnutOptions.plugins, title: undefined}}} />
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="card" style={{ minHeight: 320 }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: 16, fontWeight: 600, color: "#1a2a1a" }}>
              Priority Distribution
            </h3>
            <div style={{ height: 260 }}>
              <Doughnut data={priorityDoughnutData} options={{...doughnutOptions, plugins: {...doughnutOptions.plugins, title: undefined}}} />
            </div>
          </div>

          {/* Summary Bar Chart */}
          <div className="card" style={{ minHeight: 320, gridColumn: "1 / -1" }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: 16, fontWeight: 600, color: "#1a2a1a" }}>
              Summary Overview
            </h3>
            <div style={{ height: 260 }}>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="card" style={{ marginTop: 20 }}>
          <h3 style={{ margin: "0 0 12px 0", fontSize: 16, fontWeight: 600, color: "#1a2a1a" }}>
            Insights
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
            <div style={{ padding: 12, background: "#f8faf8", borderRadius: 8 }}>
              <div style={{ fontSize: 13, color: "#667", marginBottom: 4 }}>Resolution Rate</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>
                {total > 0 ? ((closed / total) * 100).toFixed(1) : 0}%
              </div>
            </div>
            <div style={{ padding: 12, background: "#f8faf8", borderRadius: 8 }}>
              <div style={{ fontSize: 13, color: "#667", marginBottom: 4 }}>Open Complaints</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{open}</div>
            </div>
            <div style={{ padding: 12, background: "#f8faf8", borderRadius: 8 }}>
              <div style={{ fontSize: 13, color: "#667", marginBottom: 4 }}>Avg. Priority Level</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>
                {issues.length > 0 
                  ? (issues.reduce((sum, i) => sum + (i.priorityLevel || 0), 0) / issues.length).toFixed(1)
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;