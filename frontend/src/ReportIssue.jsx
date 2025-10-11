import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./ReportIssue.css";
import { useNavigate } from "react-router-dom";
import logo from './assets/logo.jpeg'; // Import logo image

export default function ReportIssue() {
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="navbar-logo" style={{ marginRight: '15px' }}>
          <img src={logo} alt="Clean Street Logo" style={{ height: '40px' }} />
        </div>
        <div className="navbar-menu" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexGrow: 1 }}>
          <button className="navbar-menu-btn" onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button className="navbar-menu-btn active">Report Issue</button>
          <button className="navbar-menu-btn" onClick={() => navigate("/complaints")}>view complaints</button>
        </div>
        <div className="navbar-profile" onClick={() => navigate("/profile")} style={{ cursor: 'pointer' }}>
          <svg viewBox="0 0 24 24" width={24} height={24}>
            <circle cx="12" cy="8" r="4" />
            <path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" />
          </svg>
        </div>
      </div>
      <div className="container">
        <h2>Report a Civic Issue</h2>
        <div className="subtitle">
          Please fill out this form to raise your issue as a complaint. Your feedback helps us understand local problems better and work towards quick and effective solutions, improving the services in your area.
        </div>
        <form>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="issue-title">Issue title :</label>
              <input
                type="text"
                id="issue-title"
                value={issueTitle}
                onChange={e => setIssueTitle(e.target.value)}
              />
            </div>
            <div className="image-upload-box">
              <div className="image-upload-preview">
                {image && <img src={URL.createObjectURL(image)} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />}
              </div>
              <div className="image-upload-note">Upload image with size&lt;3Mb (jpg, png, jpeg)</div>
              <input
                type="file"
                accept="image/*"
                onChange={e => setImage(e.target.files[0])}
                style={{ marginTop: '8px' }}
              />
              <button type="button" className="image-upload-btn">Upload</button>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group" style={{ flex: 2 }}>
              <label htmlFor="issue-desc">Issue Description :</label>
              <textarea
                id="issue-desc"
                value={issueDescription}
                onChange={e => setIssueDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group" style={{ flex: 2 }}>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="map-section">
            <div className="form-group">
              <label>Location :</label>
              <div className="location-note">Please select the location of the issue clearly</div>
              <div>
                <MapContainer style={{ height: '260px', width: '100%', borderRadius: '13px', border: '1px solid #c9d9c2' }} center={[11.025, 77.02]} zoom={10} scrollWheelZoom={false}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer>
              </div>
            </div>
          </div>
          <div className="checkbox-row">
            <input type="checkbox" id="confirm" />
            <label htmlFor="confirm">
              I confirm that the information provided above is true and accurate, and I take full responsibility for the details submitted.
            </label>
          </div>
          <button className="submit-btn">SUBMIT</button>
        </form>
      </div>
    </>
  );
}
