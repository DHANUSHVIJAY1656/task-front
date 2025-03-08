import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import "../../styles.css/projectform.css";
import Navbar from "../navbar/projectnavbar";

const getTokenUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.name; 
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const createdBy = getTokenUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token"); 
    
    if (!token) {
      alert("Access Denied. No token provided.");
      return;
    }
  
    try {
      await axios.post(
        "http://localhost:5000/api/project",
        {
          project_name: projectName,
          created_by: createdBy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        }
      );
  
      alert("Project created successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Error creating project");
    }
  };
  

  return (
    <>
    <Navbar/>
    <div className="outerform">
    <div className="card">
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <label>Project Name</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
        <label>Created By</label>
        <input type="text" value={createdBy || "Unknown"} readOnly />
        <button type="submit">Create</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default CreateProject;
