import React, { useEffect, useState, useRef } from "react";
import "./profile.css";

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    location: "",
    citizenId: "",
    resolved: 0,
    totalIssues: 0,
    avatar: "",
  });
  const [formData, setFormData] = useState({ ...user });
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem("token");
  const fileInputRef = useRef();

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:5001/api/users/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUser(data);
        setFormData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Upload avatar to Cloudinary
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formDataCloud = new FormData();
    formDataCloud.append("file", file);
    formDataCloud.append("upload_preset", "unsigned_avatar"); // replace with your preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", // replace with your cloud name
        {
          method: "POST",
          body: formDataCloud,
        }
      );
      const data = await res.json();
      setFormData((prev) => ({ ...prev, avatar: data.secure_url }));
      setUser((prev) => ({ ...prev, avatar: data.secure_url })); // preview
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Save profile
  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update profile");
      const updated = await res.json();
      setUser(updated);
      setFormData(updated);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Profile update failed");
    }
  };

  return (
    <div className="profile-container">
      {!editMode ? (
        <>
          <div className="back-btn">← BACK</div>

          <div className="profile-header">
            <div className="avatar-box">
              <img
                src={user.avatar || "/user.png"}
                alt="User Avatar"
                className="avatar-large"
              />
              <button
                className="camera-btn"
                onClick={() => fileInputRef.current.click()}
              >
                📷
              </button>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleAvatarChange}
                disabled={uploading}
              />
            </div>
            <div className="profile-info">
              <h2>{user.name}</h2>
              <p>Citizen Id: {user.citizenId}</p>
            </div>
            <button className="primary-btn" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </div>

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
        </>
      ) : (
        <>
          <div className="topbar">
            <div className="logo">CLEAN STREET</div>
            <nav>
              <span>Dashboard</span>
              <span>Report Issue</span>
              <span>View Complaints</span>
              <span className="profile-icon">👤</span>
            </nav>
          </div>

          <div className="edit-profile">
            <h2>Profile Information</h2>
            <div className="edit-form">
              <div className="avatar-box">
                <img
                  src={user.avatar || "/user.png"}
                  alt="User Avatar"
                  className="avatar-large"
                />
                <button
                  className="camera-btn"
                  onClick={() => fileInputRef.current.click()}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "📷"}
                </button>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                />
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
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Confirm Password:
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
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
