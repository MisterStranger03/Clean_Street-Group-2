import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Fetch registered user from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.email === email && userData.password === password) {
      alert(`Logged in as ${userData.role}`);
      navigate('/dashboard', { state: { role: userData.role } }); // redirect
    } else {
      alert('Invalid credentials!');
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="logo.png" alt="Clean Street Logo" className="logo" />
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="primary-btn">Login</button>
        </form>
        <p>
          Do not have an account? 
          <span 
            onClick={() => navigate('/register')} 
            style={{color: 'blue', cursor: 'pointer'}}
          > Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;