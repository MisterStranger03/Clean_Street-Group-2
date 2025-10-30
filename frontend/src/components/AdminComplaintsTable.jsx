import React from "react";

const AdminComplaintsTable = ({ issues = [] }) => {
  const handleChangeStatus = (id, newStatus) => {
    // Replace with real API call to update status
    console.log("Change status", id, newStatus);
    alert(`Pretend we're updating ${id} => ${newStatus}`);
  };

  return (
    <div className="complaints-table">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Date</th>
            <th>Status</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {issues.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", color: "#666" }}>
                No complaints found
              </td>
            </tr>
          ) : (
            issues.map((it) => (
              <tr key={it._id}>
                <td>{it.title}</td>
                <td>{it.location || "-"}</td>
                <td>{new Date(it.date || Date.now()).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${it.status?.toLowerCase().replace(" ", "-") || "open"}`}>
                    {it.status}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button onClick={() => handleChangeStatus(it._id, "In Review")}>In Review</button>
                  <button onClick={() => handleChangeStatus(it._id, "Resolved")}>Resolve</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminComplaintsTable;
