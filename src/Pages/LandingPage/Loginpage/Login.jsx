import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          AdminEmail: email,
          AdminPassword: password,
        }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/home');
      } else {
        const message = await response.text();
        setError(message);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src="https://res.cloudinary.com/dlo7urgnj/image/upload/v1727276496/vemslogo_rsa3cx.png" alt="VEMS Logo" />
        </div>
        <div className="login-title">
          <span>Admin Login</span>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="register">
          <p>Don’t have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
