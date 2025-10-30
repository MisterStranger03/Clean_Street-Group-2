import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import AdminSidebar from "./AdminSidebar";
import AdminStatsCard from "./AdminStatsCard";
import AdminComplaintsTable from "./AdminComplaintsTable";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {  // ✅ Capital D matches import
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/issues/all");
        if (!res.ok) throw new Error("Network response not ok");
        const data = await res.json();
        setIssues(data);
      } catch (err) {
        console.warn("Could not fetch issues. Using mock data.", err);
        setIssues([
          {
            _id: "1",
            title: "Broken streetlight on 5th Ave",
            description: "Light not working for 3 days",
            status: "Open",
            location: "5th Ave, Block B",
            date: new Date().toISOString(),
            images: [],
          },
          {
            _id: "2",
            title: "Garbage dump near market",
            description: "Smell and pests",
            status: "In Review",
            location: "Market Road",
            date: new Date().toISOString(),
            images: [],
          },
        ]);
      }
    };

    fetchIssues();
  }, []);

  const handleGoToReport = () => navigate("/report");

  const stats = {
    total: issues.length,
    open: issues.filter((i) => i.status === "Open").length,
    inReview: issues.filter((i) => i.status === "In Review").length,
    resolved: issues.filter((i) => i.status === "Resolved").length,
  };

  return (
    <div className="admin-page">
      <AdminSidebar logo={logo} />
      <div className="admin-main">
        <header className="admin-top">
          <h1>Admin Dashboard</h1>
          <div className="admin-top-actions">
            <button className="btn" onClick={handleGoToReport}>
              Report Issue
            </button>
          </div>
        </header>

        <section className="admin-stats-row">
          <AdminStatsCard title="Total Issues" value={stats.total} />
          <AdminStatsCard title="Open" value={stats.open} />
          <AdminStatsCard title="In Review" value={stats.inReview} />
          <AdminStatsCard title="Resolved" value={stats.resolved} />
        </section>

        <section className="admin-content">
          <div className="admin-left-panel">
            <div className="card">
              <h3>Community Reports</h3>
              <p>Latest activity overview and quick controls.</p>
            </div>
          </div>

          <div className="admin-right-panel">
            <h2>All Complaints</h2>
            <AdminComplaintsTable issues={issues} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard; // ✅ Must match the import name
