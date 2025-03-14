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
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
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
        setUserName(decoded.name);
        setUserId(decoded.id);
        setRole(decoded.role);

        const response = await axios.get(
          `http://localhost:5000/api/tasks/assigned/${decoded.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

      
        const sortedTasks = response.data.sort((a, b) => {
          const dateA = new Date(a.created_at || a.deadline).getTime();
          const dateB = new Date(b.created_at || b.deadline).getTime();
          return dateB - dateA; 
        });

        setTasks(sortedTasks);
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
        { headers: { Authorization: `Bearer ${token}` } }
      );

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

  const addComment = async (taskId) => {
    if (!commentText[taskId]?.trim()) return;

    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/tasks/${taskId}/comments`,
        { user_id: userId, comment: commentText[taskId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTaskDetails((prev) => ({
        ...prev,
        [taskId]: {
          ...prev[taskId],
          comments: [
            ...(prev[taskId]?.comments || []),
            { user_id: { _id: userId, name: userName }, comment: commentText[taskId] },
          ],
        },
      }));

      setCommentText((prev) => ({ ...prev, [taskId]: "" }));
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error);
      setError("Could not add comment.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="manager-container">
        <div className="manager-card">
          {role === "client" ? (
            <>
              <h2>Welcome, {userName} 👋</h2>
              <p className="quote">
                "Success is not the key to happiness. Happiness is the key to success."
              </p>
            </>
          ) : (
            <h3>Assigned Tasks</h3>
          )}

          {loading && <p>Loading tasks...</p>}
          {error && <p className="error-message">{error}</p>}

          <div className="task-grid">
            {tasks.length > 0
              ? tasks.map((task) => (
                  <div key={task._id} className={`task-card ${task.priority?.toLowerCase() || "low"}`}>
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
                        {taskDetails[task._id].comments?.length > 0 ? (
                          taskDetails[task._id].comments
                            .filter(
                              (comment) =>
                                role === "admin" ||
                                role === "manager" ||
                                comment.user_id?._id === userId
                            )
                            .map((comment, index) => (
                              <p key={index}>
                                <strong>{comment.user_id?.name || "Anonymous"}:</strong> {comment.comment}
                              </p>
                            ))
                        ) : (
                          <p>No comments yet.</p>
                        )}

                        
                        {role === "Client" && (
                          <div className="comment-box">
                            <textarea
                              className="comment-input"
                              placeholder="Write a comment..."
                              value={commentText[task._id] || ""}
                              onChange={(e) => handleCommentChange(task._id, e.target.value)}
                            />
                            <button className="submit-button" onClick={() => addComment(task._id)}>
                              Add Comment
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              : !loading && <p>No tasks assigned.</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignedTasks;
