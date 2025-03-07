import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../navbar/nav.css";

const Navbar = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error);
        setRole("");
      }
    }
  }, []);

 
  if (!localStorage.getItem("token")) {
    return null;
  }

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo-con">Task Management</div>
        <div className="heading-con">
          <ul className="nav-links">
            {role === "Admin" && (
              <>
                <li><Link to="/AdminDashboard" className="nav-item">Home</Link></li>
                <li><Link to="/createproject" className="nav-item">Project</Link></li>
                
                <li><Link to="/createtask" className="nav-item">Project User</Link></li>
                <li><Link to="/Usermanagement" className="nav-item">User Management</Link></li>
              </>
            )}

            {role === "Manager" && (
              <>
                <li><Link to="/team" className="nav-item">Team</Link></li>
                <li><Link to="/reports" className="nav-item">Reports</Link></li>
              </>
            )}

            {role === "Client" && (
              <>
                <li><Link to="/client-dashboard" className="nav-item">Client Home</Link></li>
              </>
            )}

            {role === "Employee" && (
              <>
                <li><Link to="/tasks" className="nav-item">My Tasks</Link></li>
              </>
            )}

            <li><Link to="/login" className="nav-item" onClick={() => localStorage.removeItem("token")}>Logout</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
