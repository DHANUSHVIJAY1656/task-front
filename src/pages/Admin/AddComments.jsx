import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles.css/maganer.css";
import Navbar from "../../components/navbar/Navbar";
import { jwtDecode } from "jwt-decode";

const ManagerTaskView = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedTask, setExpandedTask] = useState(null);
  const [taskDetails, setTaskDetails] = useState({});
  const [commentText, setCommentText] = useState({}); 

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please login.");
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);

        if (decoded.role !== "Manager") {
          setError("Access Denied. Only managers can view this.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/api/alltask", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTasks(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("Error fetching tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const fetchTaskDetails = async (taskId) => {
    if (expandedTask === taskId) {
      setExpandedTask(null);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTaskDetails((prev) => ({ ...prev, [taskId]: response.data }));
      setExpandedTask(taskId);
    } catch (error) {
      console.error("Error fetching task details:", error.response?.data || error);
      setError("Could not fetch task details.");
    }
  };

  const handleCommentChange = (taskId, value) => {
    setCommentText((prev) => ({ ...prev, [taskId]: value }));
  };

  const submitComment = async (taskId) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      setError("No token found. Please login.");
      return;
    }
  
    if (!commentText[taskId] || commentText[taskId].trim() === "") {
      alert("Comment cannot be empty!");
      return;
    }
  
    try {
      const decoded = jwtDecode(token);
      const user_id = decoded.id; 
  
      await axios.post(
        `http://localhost:5000/api/tasks/${taskId}/comments`,
        { user_id, comment: commentText[taskId] }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
    
      setTaskDetails((prev) => ({
        ...prev,
        [taskId]: {
          ...prev[taskId],
          comments: [...(prev[taskId]?.comments || []), { user_id: { name: decoded.name }, comment: commentText[taskId] }],
        },
      }));
  
     
      setCommentText((prev) => ({ ...prev, [taskId]: "" }));
    } catch (error) {
      console.error("Error submitting comment:", error.response?.data || error);
      setError("Could not submit comment.");
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="outerform">
        <div className="card">
          <h2>Manager Task View</h2>

          {loading && <p>Loading tasks...</p>}
          {error && <p className="error-message">{error}</p>}

          <div className="task-grid">
            {tasks.length > 0 ? (
              tasks.map((task) => {
                const priorityClass = task.priority
                  ? task.priority.toLowerCase()
                  : "low"; 

                return (
                  <div key={task._id} className={`task-card ${priorityClass}`}>
                    <h3>{task.title}</h3>
                    <p><strong>Project:</strong> {task.project_id?.project_name || "N/A"}</p>
                    <p><strong>Assigned By:</strong> {task.assigned_by?.name || "Unknown"}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <p><strong>Priority:</strong> {task.priority || "Low"}</p>

                    <button className="details-button" onClick={() => fetchTaskDetails(task._id)}>
                      {expandedTask === task._id ? "Hide Details" : "View Details"}
                    </button>

                    {expandedTask === task._id && taskDetails[task._id] && (
                      <div className="task-details">
                        <h4>Task Details</h4>
                        <p><strong>Description:</strong> {taskDetails[task._id].task_description}</p>
                        <p><strong>Deadline:</strong> {new Date(taskDetails[task._id].deadline).toDateString()}</p>
                        <p><strong>Assigned To:</strong> {taskDetails[task._id].assigned_to?.name || "Unknown"}</p>

                        <h4>Comments</h4>
                        {taskDetails[task._id].comments && taskDetails[task._id].comments.length > 0 ? (
                          taskDetails[task._id].comments.map((comment, index) => (
                            <p key={index}>
                              <strong>{comment.user_id?.name || "Anonymous"}:</strong> {comment.comment}
                            </p>
                          ))
                        ) : (
                          <p>No comments yet.</p>
                        )}

                      
                        <div className="comment-box">
                          <textarea
                            placeholder="Add a comment..."
                            value={commentText[task._id] || ""}
                            onChange={(e) => handleCommentChange(task._id, e.target.value)}
                          />
                          <button className="submit-button" onClick={() => submitComment(task._id)}>
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              !loading && <p>No tasks available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerTaskView;
