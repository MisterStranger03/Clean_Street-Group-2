import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(''); // Base64 string
  const fileInputRef = useRef();

  // Convert selected file to Base64
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result);
    reader.readAsDataURL(file); // Base64 string
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = { 
      name: fullName, 
      username,
      email,
      password,
      role,
      avatar, // send Base64 string to backend
    };

    try {
      const res = await fetch("http://localhost:5001/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert(`Registered successfully as ${role}!`);
      navigate('/login');
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed. Check console for details.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="logo.png" alt="Clean Street Logo" className="logo"/>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Full Name" 
            value={fullName} 
            onChange={e => setFullName(e.target.value)} 
            required 
          />
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />

          {/* Avatar Upload */}
          <div className="avatar-upload">
            <button type="button" onClick={() => fileInputRef.current.click()}>
              Upload Avatar
            </button>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleAvatarChange} 
            />
            {avatar && <img src={avatar} alt="Avatar Preview" className="avatar-preview" />}
          </div>

          <select 
            value={role} 
            onChange={e => setRole(e.target.value)} 
            required 
            className="input-box"
          >
            <option value="" disabled hidden>Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="primary-btn">Register</button>
          <p>
            Already have an account?{" "}
            <span 
              onClick={() => navigate('/login')} 
              className="link-text"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
