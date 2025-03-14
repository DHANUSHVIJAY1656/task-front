import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "../../styles.css/Admindashboardhome.css";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";

const Admindashboardhome = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser({ name: decoded?.name, role: decoded?.role });
      console.log("User:", decoded?.name);
    } catch (err) {
      console.error("Token decoding error:", err);
      setError("Invalid token");
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/alltask", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data); 
        setTasks(response.data); 
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false); 
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
  <Navbar/>
    <div className="task-list-container">

      <div className="user-info">
        <h3>Great Welcome You: {user?.name || "Unknown User"}</h3>
        <p>Role: <span className="role">{user?.role || "No Role"}</span></p>
      </div>

      
      <div className="task-grid con">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task?._id} className="task-card">
              <h2 className="task-title">{task?.task_name || "No Task Name"}</h2>
              <p className="task-description">
                {task?.task_description || "No description available."}
              </p>
              <div className="task-info">
                <span><strong>Assigned To:</strong> {task?.assigned_to?.name || "N/A"} ({task?.assigned_to?.email || "N/A"})</span>
                <span><strong>Assigned By:</strong> {task?.assigned_by?.name || "N/A"} ({task?.assigned_by?.email || "N/A"})</span>
                <span><strong>Project:</strong> {task?.project_id?.project_name || "N/A"}</span>
                <span><strong>Deadline:</strong> {task?.deadline ? new Date(task.deadline).toLocaleDateString() : "No Deadline"}</span>
              </div>
              <div className="task-status">
                <span className={`status ${task?.status?.toLowerCase().replace(" ", "-") || "unknown"}`}>
                  {task?.status || "No Status"}
                </span>
                <span className={`priority ${task?.priority?.toLowerCase() || "low"}`}>
                  {task?.priority || "Low"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-tasks">No tasks available.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Admindashboardhome;
