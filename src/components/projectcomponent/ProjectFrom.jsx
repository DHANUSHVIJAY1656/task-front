import React, { useState, useEffect } from "react";
import "../../styles.css/projectformandlist.css";

const ProjectForm = ({ onSubmit, editingProject }) => {
  const [projectName, setProjectName] = useState("");  
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (editingProject) {
      setProjectName(editingProject.project_name);
      setStatus(editingProject.status);
    }
  }, [editingProject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = { project_name: projectName, status }; 
    onSubmit(editingProject ? editingProject._id : null, projectData);
    setProjectName("");
    setStatus("Pending");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingProject ? "Edit Project" : "Create Project"}</h2>
      <input
        type="text"
        placeholder="Project Name"
        value={projectName}  
        onChange={(e) => setProjectName(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">{editingProject ? "Update" : "Create"}</button>
    </form>
  );
};

export default ProjectForm;
