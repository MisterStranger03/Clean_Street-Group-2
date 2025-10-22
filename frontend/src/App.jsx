import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';  // Import global styles here
import HomePage from './HomePage.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Dashboard from './Dashboard.jsx';
import Profile from './Profile.jsx';
import ReportIssue from './ReportIssue.jsx';
import ViewComplaints from "./ViewComplaints";
// import AdminDashboard from './admin_dashboard_page';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/complaints" element={<ViewComplaints />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}

      </Routes>
    </Router>
  );
}

export default App;
