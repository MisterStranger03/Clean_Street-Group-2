import React from "react";
import './styles.css';

function Dashboard() {
  return (
    <div>
      <header className="navbar">
        <div className="logo">CLEAN STREET</div>
        <input type="text" placeholder="Search complaints or address" />
        <nav>
          <button className="icon-btn">🔍</button>
          <button className="icon-btn">⚙️</button>
          <img src="/user.png" alt="User Avatar" className="avatar"/>
        </nav>
      </header>

      <main className="dashboard">
        <aside className="sidebar">
          <ul>
            <li className="active">Dashboard</li>
            <li>Complaints</li>
            <li>Report</li>
            <li>Profile</li>
          </ul>
        </aside>

        <section className="content">
          <h1>Dashboard</h1>
          <div className="kpis">
            <div className="kpi">Total Reports <span>24</span></div>
            <div className="kpi">Open <span>9</span></div>
            <div className="kpi">In Review <span>11</span></div>
            <div className="kpi">Resolved <span>4</span></div>
          </div>

          <div className="complaints">
            <div className="card">
              <img src="/garbage.jpg" alt="Garbage Dump"/>
              <h3>Garbage Dump</h3>
              <p>Accumulated garbage in a public area</p>
              <span className="status received">Received</span>
            </div>
            <div className="card">
              <img src="/pothole.jpg" alt="Pothole"/>
              <h3>Pothole</h3>
              <p>Large pothole in the middle of the road</p>
              <span className="status review">In Review</span>
            </div>
            <div className="card">
              <img src="/leak.jpg" alt="Water Leakage"/>
              <h3>Water Leakage</h3>
              <p>Water leakage from a broken pipe</p>
              <span className="status received">Received</span>
            </div>
            <div className="card">
              <img src="/streetlight.jpg" alt="Broken Streetlight"/>
              <h3>Broken Streetlight</h3>
              <p>Streetlight not working</p>
              <span className="status resolved">Resolved</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;