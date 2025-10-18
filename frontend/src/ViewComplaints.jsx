import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import logo from "./assets/logo.jpeg";

export default function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/issues/all", {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch complaints");
        }
        const data = await res.json();
        setComplaints(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [token]);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleStatusChange = async (complaintId, newStatus) => {
    setUpdatingStatus(complaintId);

    try {
      const response = await fetch(`http://localhost:5001/api/issues/${complaintId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update the local state
      setComplaints(prevComplaints =>
        prevComplaints.map(complaint =>
          complaint._id === complaintId
            ? { ...complaint, status: newStatus }
            : complaint
        )
      );

      alert(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    } finally {
      setUpdatingStatus(null);
    }
  };

  if (loading) return <div>Loading complaints...</div>;

  if (complaints.length === 0)
    return <div>No complaints reported yet.</div>;

  return (
    <div className="dashboard">
      <header className="top-nav">
        <div className="brand">
          <img src={logo} alt="Clean Street Logo" className="brand-logo" />
        </div>
        <nav className="nav-links">
          <a href="/dashboard">Dashboard</a>
          <a href="/report">Report Issue</a>
          <a href="/complaints" className="active">View Complaints</a>
        </nav>
        <button type="button" className="profile" onClick={handleProfileClick}>
          <span className="sr-only">Account</span>
          <svg viewBox="0 0 24 24" aria-hidden focusable="false">
            <path
              d="M12 4.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 8.5c3.35 0 6 2.22 6 4.96V19.5H6v-1.54C6 15.22 8.65 13 12 13z"
              fill="currentColor"
            />
          </svg>
        </button>
      </header>

      {/* Back Button - Top Left Corner */}
      <div className="back-btn-container" style={{
        position: "absolute",
        top: "80px",
        left: "2rem",
        zIndex: "1000"
      }}>
        <div className="back-btn" onClick={() => navigate(-1)} style={{
          cursor: "pointer",
          fontSize: "1rem",
          color: "#5f7f47",
          fontWeight: "600"
        }}>
          ← BACK
        </div>
      </div>

      <main className="dashboard-content">
        <div className="content">
          <h2>Reported Complaints</h2>
          {complaints.length === 0 ? (
            <div>No complaints reported yet.</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {complaints.map((issue) => (
                <div key={issue._id} style={{border: "1px solid #ccc", marginBottom: "10px", padding: "10px", borderRadius: "12px"}}>
                  <h3 style={{fontSize: "1.4rem", fontWeight: "700", color: "#2d5a3d", marginBottom: "0.8rem"}}>{issue.title}</h3>
                  <p><b>Priority:</b> {issue.priority} (Level {issue.priorityLevel})</p>
                  <p><b>Description:</b> {issue.description}</p>
                  <p><b>Address:</b> {issue.address}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <b>Status:</b>
                    <select
                      value={issue.status || ''}
                      onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                      disabled={updatingStatus === issue._id}
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        fontSize: "0.9rem",
                        backgroundColor: updatingStatus === issue._id ? "#f0f0f0" : "white"
                      }}
                    >
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                    </select>
                    {updatingStatus === issue._id && (
                      <span style={{ fontSize: "0.8rem", color: "#666" }}>Updating...</span>
                    )}
                  </div>
                  <p><b>Date Reported:</b> {new Date(issue.createdAt).toLocaleString()}</p>

                  {issue.images && issue.images.length > 0 && (
                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                      {issue.images.map((img, i) => (
                        <img key={i} src={img} alt="Issue" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
