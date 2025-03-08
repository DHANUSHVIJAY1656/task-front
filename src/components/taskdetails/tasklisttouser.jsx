import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles.css/userlist.css";
import Navbar from "../navbar/Navbar";
import { jwtDecode } from "jwt-decode";

const AssignedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(""); 
  const [expandedTask, setExpandedTask] = useState(null); 
  const [taskDetails, setTaskDetails] = useState({}); 
  const [commentText, setCommentText] = useState(""); 

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
        setUserName(decoded.name);

        const userId = decoded.id;
        const response = await axios.get(`http://localhost:5000/api/tasks/assigned/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTasks(response.data);
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
      const response = await axios.get(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );

      setTaskDetails((prev) => ({ ...prev, [taskId]: response.data }));
      setExpandedTask(taskId);
    } catch (error) {
      console.error("Error fetching task details:", error.response?.data || error);
      setError("Could not fetch task details.");
    }
  };

  const addComment = async (taskId) => {
    if (!commentText.trim()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const user_id = decoded.id;

      await axios.post(
        
        `http://localhost:5000/api/tasks/${taskId}/comments`,
        { user_id, comment: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

    
      setTaskDetails((prev) => ({
        ...prev,
        [taskId]: {
          ...prev[taskId],
          comments: [...prev[taskId].comments, { user_id: { name: userName }, comment: commentText }]
        }
      }));

      setCommentText(""); 
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error);
      setError("Could not add comment.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="outerform">
        <div className="card">
          {userName && <h2>Welcome, {userName} 👋</h2>}
          <h3>Assigned Tasks</h3>

          {loading && <p>Loading tasks...</p>}
          {error && <p className="error-message">{error}</p>}
          
          <div className="task-grid">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div key={task._id} className="task-card">
                  <h3>{task.title}</h3>
                  <p><strong>Project:</strong> {task.project_id?.project_name || "N/A"}</p>
                  <p><strong>Assigned By:</strong> {task.assigned_by?.name || "Unknown"}</p>
                  <p><strong>Status:</strong> {task.status}</p>

                  <button className="details-button" onClick={() => fetchTaskDetails(task._id)}>
                    {expandedTask === task._id ? "Hide Details" : "View Details"}
                  </button>

                  {expandedTask === task._id && taskDetails[task._id] && (
                    <div className="task-details">
                      <h4>Task Details</h4>
                      <p><strong>Description:</strong> {taskDetails[task._id].task_description}</p>
                      <p><strong>Priority:</strong> {taskDetails[task._id].priority}</p>
                      <p><strong>Deadline:</strong> {new Date(taskDetails[task._id].deadline).toDateString()}</p>
                      

                      <h4>Comments</h4>
                      {taskDetails[task._id].comments.length > 0 ? (
                        taskDetails[task._id].comments.map((comment, index) => (
                          <p key={index}>
                            <strong>{comment.user_id?.name || "Anonymous"}:</strong> {comment.comment}
                          </p>
                        ))
                      ) : (
                        <p>No comments yet.</p>
                      )}

                     
                      <div className="comment-section">
                        <textarea
                          className="comment-input"
                          placeholder="Write a comment..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button className="comment-button" onClick={() => addComment(task._id)}>Add Comment</button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              !loading && <p>No tasks assigned.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignedTasks;
