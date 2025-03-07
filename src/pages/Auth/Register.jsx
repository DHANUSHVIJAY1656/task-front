import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../../styles.css/Register.css";
import Navbar from "../../components/navbar/usermanagenav";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    createdBy: "", 
  });

  const [createdByName, setCreatedByName] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (!decoded || !decoded.role || !decoded.id) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

     
      setFormData((prev) => ({ ...prev, createdBy: decoded.id }));

      
      setCreatedByName(decoded.name);
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const { name, email, password, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/register",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
 
  <>
  <Navbar/>
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />
        <select name="role" value={role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Client">Client</option>
          <option value="Employee">Employee</option>
        </select>

        <div className="created-by-container">
          <label>Created By</label>
          <input type="text" value={createdByName} readOnly required />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
    </>
  );
};

export default Register;
