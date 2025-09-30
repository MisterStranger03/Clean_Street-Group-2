import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState('user'); // default role
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    const userData = { fullName, username, email, password, role };
    localStorage.setItem('userData', JSON.stringify(userData));

    alert(`Registered as ${role}!`);
    navigate('/login');
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="logo.png" alt="Clean Street Logo" className="logo"/>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          
          {/* Styled dropdown */}
          <div className="role-dropdown">
            <label>Select Role:</label>
            <select value={role} onChange={e => setRole(e.target.value)} required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <button type="submit" className="primary-btn">Register</button>
          <p>Already have an account? <span onClick={() => navigate('/login')} className="link-text">Login</span></p>
        </form>
      </div>
    </div>
  );
}

export default Register;