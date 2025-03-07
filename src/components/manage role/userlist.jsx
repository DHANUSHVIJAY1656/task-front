import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles.css/user.css";
import { jwtDecode } from "jwt-decode";
import Navbar from "../navbar/usermanagenav";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        return;
      }

      try {
       
        const decoded = jwtDecode(token);
        setCurrentUser(decoded);

      
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Error fetching users. Please try again.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="outerform">
        <div className="card">
          <h2>User List</h2>

          {error && <p className="error-message">{error}</p>}
          {currentUser && <p>Welcome, {currentUser.name}!</p>}

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
              <p>No users found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
