import React, { useEffect, useState } from "react";

export default function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

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

  if (loading) return <div>Loading complaints...</div>;

  if (complaints.length === 0)
    return <div>No complaints reported yet.</div>;

  return (
    <div className="container">
      <h2>Reported Complaints</h2>
      <ul>
        {complaints.map((issue) => (
          <li key={issue._id} style={{border: "1px solid #ccc", marginBottom: "10px", padding: "10px"}}>
            <h3>{issue.title}</h3>
            <p><b>Priority:</b> {issue.priority} (Level {issue.priorityLevel})</p>
            <p><b>Description:</b> {issue.description}</p>
            <p><b>Address:</b> {issue.address}</p>
            <p><b>Status:</b> {issue.status}</p>
            <p><b>Date Reported:</b> {new Date(issue.createdAt).toLocaleString()}</p>

            {issue.images && issue.images.length > 0 && (
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                {issue.images.map((img, i) => (
                  <img key={i} src={img} alt="Issue" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
