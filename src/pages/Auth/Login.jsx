// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../../styles.css/login.css';
// import axios from 'axios';
// import { jwtDecode } from "jwt-decode";
// import Navbar from "../../components/navbar/Navbar";

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate(); 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       const response = await axios.post('http://localhost:5000/api/login', { email, password }, {
//         headers: { 'Content-Type': 'application/json' }
//       });

//       const data = response.data; 

//       if (response.status !== 200) {
//         throw new Error(data.message || 'Login failed');
//       }

//       localStorage.setItem('token', data.token);

//       const decoded = jwtDecode(data.token);
//       alert(`🎉 Welcome, ${decoded.name}! 🚀 Your journey begins now. Click OK to continue.`);

//       switch (decoded.role) {
//         case 'Admin':
//           navigate('/Admindashboard');
//           break;
//         case 'Manager':
//           navigate('/manager-dashboard');
//           break;
//         case 'Client':
//           navigate('/client-dashboard');
//           break;
//         case 'Employee':
//           navigate('/tasks');
//           break;
//         default:
//           navigate('/');
//           break;
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || error.message);
//       console.error('Login error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className='login-wrapper'>
//         <div className="login-box">
//           <h2 className="login-title">Login</h2>
//           {error && <p className="error-text">{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="input-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div className="input-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>
//             <button type="submit" className="login-btn" disabled={loading}>
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;


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
  const [successMessage, setSuccessMessage] = useState('');
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
      setSuccessMessage(`🎉 Welcome, ${decoded.name}! 🚀 Your journey begins now.`);

      // Redirect after 2 seconds
      setTimeout(() => {
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
      }, 2000); 
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
      <div className='login-wrapper'>
        <div className="login-box">
          <h2 className="login-title">Login</h2>

          {error && <p className="error-text">{error}</p>}

          {successMessage && <div className="success-message">{successMessage}</div>}  

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
