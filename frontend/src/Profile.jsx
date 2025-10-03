import React, { useState } from "react";
import "./profile.css";

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: "Ameerunnisa Khan",
    username: "Ameerunnisa",
    email: "Ameerunnisa@gmail.com",
    location: "Kakinada",
    citizenId: "2",
    resolved: 85,
    totalIssues: 24,
  });

  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(formData);
    setEditMode(false);
  };

  return (
    <div className="profile-container">
      {!editMode ? (
        <>
          {/* Back Button */}
          <div className="back-btn">← BACK</div>

          {/* Profile Header */}
          <div className="profile-header">
            <div className="avatar-box">
              <img src="/user.png" alt="User Avatar" className="avatar-large" />
              <button className="camera-btn">📷</button>
            </div>
            <div className="profile-info">
              <h2>{user.name}</h2>
              <p>Citizen Id: {user.citizenId}</p>
            </div>
            <button className="primary-btn" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </div>

          {/* Account Info */}
          <div className="account-info">
            <h3>Account Information</h3>
            <p className="info-sub">
              The information below is private and helps us personalize your
              experience on the platform.
            </p>
            <div className="info-row">
              <label>Email :</label>
              <span>{user.email}</span>
            </div>
            <div className="info-row">
              <label>Location :</label>
              <span>{user.location}</span>
            </div>
            <div className="info-row">
              <label>Password :</label>
              <span>•••••••</span>
            </div>
          </div>

          {/* Reports Status */}
          <div className="reports-card">
            <div className="circle-chart">
              <svg viewBox="0 0 36 36">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray={`${user.resolved}, 100`}
                  d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="circle-text">{user.resolved}%</div>
            </div>
            <div className="report-info">
              <h4>Total issues: {user.totalIssues}</h4>
              <p>Recent Activity:</p>
              <ul>
                <li>Raised issue on street light fault near main road</li>
                <li>Raised issue on water quality due to impurities</li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Navigation bar (Edit Mode) */}
          <div className="topbar">
            <div className="logo">CLEAN STREET</div>
            <nav>
              <span>Dashboard</span>
              <span>Report Issue</span>
              <span>View Complaints</span>
              <span className="profile-icon">👤</span>
            </nav>
          </div>

          {/* Edit Profile Form */}
          <div className="edit-profile">
            <h2>Profile Information</h2>
            <div className="edit-form">
              <div className="avatar-box">
                <img src="/user.png" alt="User Avatar" className="avatar-large" />
                <button className="camera-btn">📷</button>
              </div>
              <div className="form-fields">
                <label>
                  Full Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Location:
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    placeholder="Change Password"
                  />
                </label>
                <label>
                  Confirm Password:
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                </label>
              </div>
            </div>

            <div className="button-row">
              <button className="primary-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="secondary-btn"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;