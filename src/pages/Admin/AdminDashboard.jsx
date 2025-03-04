import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectForm from "./ProjectFrom";
import ProjectList from "./ProjectList";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleCreateProject = async (projectData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/create", projectData);
      setProjects([...projects, response.data.project]);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleUpdateProject = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/put/${id}`, updatedData);
      setProjects(projects.map((project) => (project._id === id ? response.data.project : project)));
      setEditingProject(null); // Reset editing state
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
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