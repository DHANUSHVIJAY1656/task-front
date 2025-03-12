import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles.css/login.css';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/navbar/Navbar";

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
      const response = await axios.post('http://localhost:5000/api/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      });

      const data = response.data; 

      if (response.status !== 200) {
        throw new Error(data.message || 'Login failed');
      }

      
      localStorage.setItem('token', data.token);

    
      const decoded = jwtDecode(data.token);
      console.log('Decoded Token:', decoded);

    
      alert(`Login successful! Welcome, ${decoded.name}`);

     
      switch (decoded.role) {
        case 'Admin':
          navigate('/Admindashboard');
          break;
        case 'Manager':
          navigate('/manager-dashboard');
          break;
        case 'Client':
          navigate('/client-dashboard');
          break;
        case 'Employee':
          navigate('/tasks');
          break;
        default:
          navigate('/');
          break;
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className='outerform'>
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
      </div>
    </>
  );
};

export default Login;
