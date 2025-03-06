import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectForm from "../../components/projectcomponent/ProjectFrom";
import ProjectList from "../../components/projectcomponent/ProjectList";
import Login from "../../pages/Auth/Login";


const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      const fetchProjects = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/get", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProjects(response.data);
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      };
    
      fetchProjects();
    }
  },[token]);

  const handleCreateProject = async (projectData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/create", projectData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects([...projects, response.data.project]);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleUpdateProject = async (id, updatedData) => {
    try {
      const projectToUpdate = projects.find((project) => project._id === id);
      if (!projectToUpdate) {
        console.error("Project not found!");
        return;
      }
  
      const dataToSend = {
        ...updatedData,
        created_by: projectToUpdate.created_by, 
      };
  
      const response = await axios.put(
        `http://localhost:5000/api/put/${id}`,
        dataToSend,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setProjects(
        projects.map((project) =>
          project._id === id ? response.data.project : project
        )
      );
      setEditingProject(null);
    } catch (error) {
      console.error("Error updating project:", error.response?.data || error);
    }
  };
  
  

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <ProjectForm
        onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
        editingProject={editingProject}
      />
      <ProjectList
        projects={projects}
        onEdit={setEditingProject}
        onUpdate={handleUpdateProject}
      />
     
    </div>
  );
};

export default AdminDashboard;