import React from "react";
import "./Dashboard.css";
import logo from "./assets/logo.jpeg";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

const stats = [
  {
    label: "Total issues",
    value: 24,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden focusable="false">
        <path
          d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 10.5a1 1 0 0 1-1-1V7.75a1 1 0 1 1 2 0V12.5a1 1 0 0 1-1 1zm0 3.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Open",
    value: 9,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden focusable="false">
        <path
          d="M12 2 3.5 20.5h17L12 2zm0 4.2 5.38 11.3H6.62L12 6.2zm-.9 3.8v4.5h1.8V10h-1.8zm0 5.6v1.8h1.8v-1.8h-1.8z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "In Review",
    value: 11,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden focusable="false">
        <path
          d="M6.5 4h11A1.5 1.5 0 0 1 19 5.5v11.88l-4.24-3.24H6.5A1.5 1.5 0 0 1 5 12.64V5.5A1.5 1.5 0 0 1 6.5 4zm.5 2v6.64h7.02L17 15.7V6H7z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Resolved",
    value: 4,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden focusable="false">
        <path
          d="M19 5.5 9.75 14.74l-4.5-4.49L5.66 9l4.09 4.1L17.59 5.2 19 5.5z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

const activities = [
  "New streetlight issue reported",
  "Garbage dumped complaint",
  "Problem on main street",
];

const quickActions = [
  { label: "+ Report issues here", primary: true, action: "/report" },
  { label: "view all the components", primary: false, action: "/complaints" },
];

const Dashboard = () => {
  const navigate = useNavigate(); // 2. Initialize navigate

  const handleProfileClick = () => {
    navigate("/profile"); // 3. Define the navigation function
  };

  const handleQuickAction = (action) => {
    navigate(action);
  };

  return (
    <div className="dashboard">
      <header className="top-nav">
        <div className="brand">
          <img src={logo} alt="Clean Street Logo" className="brand-logo" />
        </div>
        <nav className="nav-links">
          <a href="/dashboard" className="active">
            Dashboard
          </a>
          <a href="/report">Report Issue</a>
          <a href="/complaints">view complaints</a>
        </nav>
        <button
          type="button"
          className="profile"
          onClick={handleProfileClick} // 4. Add the onClick handler
        >
          <span className="sr-only">Account</span>
          <svg viewBox="0 0 24 24" aria-hidden focusable="false">
            <path
              d="M12 4.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 8.5c3.35 0 6 2.22 6 4.96V19.5H6v-1.54C6 15.22 8.65 13 12 13z"
              fill="currentColor"
            />
          </svg>
        </button>
      </header>

      <main className="dashboard-content">
        <section className="hero">
          <div className="hero-illustration" aria-hidden />
        </section>

        <section className="stats-grid">
          {stats.map(({ label, value, icon }) => (
            <div className="stat-card" key={label}>
              <div className="stat-icon">{icon}</div>
              <div className="stat-details">
                <span className="stat-label">{label}</span>
                <span className="stat-value">{value}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="bottom-panels">
          <aside className="recent-activity">
            <header>
              <span>Recent Activity</span>
              <button type="button" className="activity-cta">
                &gt;
              </button>
            </header>
            <ul>
              {activities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>

          <aside className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="actions">
              {quickActions.map(({ label, primary, action }) => (
                <button
                  key={label}
                  type="button"
                  className={primary ? "primary" : "secondary"}
                  onClick={() => handleQuickAction(action)}
                >
                  {label}
                </button>
              ))}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
