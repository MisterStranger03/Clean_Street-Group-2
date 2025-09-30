import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/users/login', {
        email,
        password,
      }, { withCredentials: true });

      if (response.data && response.data.user) {
        // Store JWT token in localStorage
        localStorage.setItem('token', response.data.user.token);

        alert(`Logged in as ${response.data.user.role}`);
        navigate('/dashboard', { state: { role: response.data.user.role } }); // redirect
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed!');
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
          Do not have an account?{" "}
          <span 
            onClick={() => navigate('/register')} 
            className="link-text"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;