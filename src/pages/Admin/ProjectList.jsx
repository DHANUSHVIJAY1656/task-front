import React from "react";
import "../../styles.css/projectformandlist.css"
const ProjectList = ({ projects, onEdit, onUpdate }) => {
  return (
    <div>
      <h2>Projects</h2>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project.project_name}</td>
              <td>{project.status}</td>
              <td>{project.created_by?.name || "Unknown"}</td>
              <td>
                <button onClick={() => onEdit(project)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;