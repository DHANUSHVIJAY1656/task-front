import React, { useState, useEffect } from "react";
import axios from "axios";
import "./createtask.css";
import Navbar from "../navbar/Navbar";
import { jwtDecode } from "jwt-decode";

const CreateTask = () => {
  const [taskData, setTaskData] = useState({
    task_name: "",
    task_description: "",
    task_doc: "",
    assigned_to: "",
    assigned_by: "",
    deadline: "",
    project_id: "",
    priority: "Medium",
  });

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignedByName, setAssignedByName] = useState("");
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      if (decoded?.id && decoded?.name) {
        setTaskData((prev) => ({ ...prev, assigned_by: decoded.id }));
        setAssignedByName(decoded.name);
      }
    } catch (error) {
      console.error("Error decoding token", error);
    }

    axios
      .get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));

    axios
      .get("http://localhost:5000/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(taskData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        taskData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Task created successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task");
    }
  };

  return (
    <>
      <Navbar />
      <div className="task-form-container">
        <form onSubmit={handleSubmit} className="task-form">
          <h2>Create a New Task</h2>

          <div className="form-group">
            <label>Task Name</label>
            <input
              type="text"
              name="task_name"
              onChange={handleChange}
              required
              placeholder="Enter task name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="task_description"
              onChange={handleChange}
              placeholder="Enter task description"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Task Document (URL)</label>
            <input
              type="text"
              name="task_doc"
              onChange={handleChange}
              placeholder="Provide a document link"
            />
          </div>

          <div className="form-group">
            <label>Assigned To</label>
            <select name="assigned_to" onChange={handleChange} required>
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Assigned By</label>
            <input type="text" value={assignedByName} readOnly />
          </div>

          <div className="form-group">
            <label>Deadline</label>
            <input
              type="date"
              name="deadline"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Project</label>
            <select name="project_id" onChange={handleChange} required>
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.project_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <div className="task-priority">
              <div
                className={`priority-option high ${
                  taskData.priority === "High" ? "selected" : ""
                }`}
                onClick={() => setTaskData({ ...taskData, priority: "High" })}
              >
                High
              </div>
              <div
                className={`priority-option medium ${
                  taskData.priority === "Medium" ? "selected" : ""
                }`}
                onClick={() =>
                  setTaskData({ ...taskData, priority: "Medium" })
                }
              >
                Medium
              </div>
              <div
                className={`priority-option low ${
                  taskData.priority === "Low" ? "selected" : ""
                }`}
                onClick={() => setTaskData({ ...taskData, priority: "Low" })}
              >
                Low
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Create Task
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateTask;


