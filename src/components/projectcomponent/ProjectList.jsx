import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles.css/projectlist.css";
import Navbar from "../navbar/projectnavbar";
import { jwtDecode } from "jwt-decode";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please login.");
      return;
    }

    try {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);

      axios
        .get("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("Projects:", res.data);
          setProjects(res.data);
        })
        .catch((err) => console.error("Error fetching projects:", err));
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="outerform">
        <div className="project-list">
          <h2>All Projects</h2>
          {user && <p className="welcome-message">Welcome, {user.name}!</p>}
          <div className="task-grid">
            {projects.length > 0 ? (
              projects.map((p) => (
                <div key={p._id} className="project-card">
                  <h3 className="project-title">{p.project_name}</h3>
                  <p className="project-info">
                    <strong>Created by:</strong> {p.created_by?.name || "Unknown"}
                  </p>
                  <p className="project-info">
                    <strong>Status:</strong> {p.status || "Not Available"}
                  </p>
                </div>
              ))
            ) : (
              <p className="no-projects-message">No projects found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectList;
