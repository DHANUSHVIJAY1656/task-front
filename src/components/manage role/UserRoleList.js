import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles.css/userlist.css";
import Navbar from "../navbar/Navbar";
import { jwtDecode } from "jwt-decode";

const UserRoleList = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  // Available roles
  const roles = ["Client", "Employee", "Manager", "Admin"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
    } catch (err) {
      console.error("Invalid token:", err);
      setError("Invalid token. Please login again.");
    }
  }, []);

 
  const fetchUsersByRole = async (role) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/users/role/${role}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Error fetching users. Please try again.");
    }
  };

  
  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    if (role) {
      fetchUsersByRole(role);
    } else {
      setUsers([]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="outerform">
        <div className="card">
          <h2>Filter Users by Role</h2>

          {error && <p className="error-message">{error}</p>}
          {currentUser && <p>Welcome, {currentUser.name}!</p>}

          
          <label>Select Role:</label>
          <select value={selectedRole} onChange={handleRoleChange}>
            <option value="">-- Select Role --</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          
          <div className="user-grid">
            {users.length > 0 ? (
              users.map((user) => (
                <div key={user._id} className="user-card">
                  <h3>{user.name}</h3>
                  <p>Email: {user.email}</p>
                  <p>Role: {user.role}</p>
                </div>
              ))
            ) : (
              selectedRole && <p>No users found for {selectedRole} role.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRoleList;
