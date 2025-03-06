import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles.css/login.css';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import Navbar from '../../components/navbar/Navbar';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  try {
      const response = await axios.post('http://localhost:5000/api/login', {
          email,
          password
      }, {
          headers: { 'Content-Type': 'application/json' }
      });

      const data = response.data; // Axios auto-parses JSON

      if (!response.status === 200) {
          throw new Error(data.message || 'Login failed');
      }

      console.log('Login successful:', data);

      localStorage.setItem('token', data.token);

      // Decode the token
      const decoded = jwtDecode(data.token);
      console.log(decoded);

      // Navigate based on role
      if (decoded.role === 'Admin') {
          navigate('/Admindashboard');
      } else if (decoded.role === 'Manager') {
          navigate('/manager-dashboard');
      } else if (decoded.role === 'Client') {
          navigate('/client-dashboard');
      } else if (decoded.role === 'Employee') {
          navigate('/employee-dashboard');
      } else {
          navigate('/');
      }
  } catch (error) {
      setError(error.response?.data?.message || error.message);
      console.error('Login error:', error);
  } finally {
      setLoading(false);
  }
};
  return (
    <Navbar>
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
    </Navbar>
  );
};

export default Login;
