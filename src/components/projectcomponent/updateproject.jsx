import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles.css/updateproject.css";
import Navbar from "../navbar/projectnavbar";

const UpdateProject = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const statusOptions = ["Pending", "In Progress", "Completed", "On Hold"];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    const project = projects.find((p) => p._id === projectId);
    setSelectedProject(project);
    setStatus(project?.status || "");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedProject || !selectedProject._id) {
      alert("Invalid project selection. Please choose a project.");
      return;
    }

    console.log("Updating project with ID:", selectedProject._id); 

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:5000/api/update/${selectedProject._id}`,
        { project_name: selectedProject.project_name, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Update response:", response.data);
      alert("Project updated successfully");
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error updating project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="outerform">
        <div className="update-card">
          <h2>Update Project</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Select Project</label>
              <select className="form-control" onChange={handleProjectChange} required>
                <option value="">-- Select Project --</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.project_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">-- Select Status --</option>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="update-btn" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProject;
