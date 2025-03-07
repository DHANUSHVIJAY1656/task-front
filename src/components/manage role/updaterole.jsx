import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles.css/updateuserrole.css";
import Navbar from "../navbar/usermanagenav";


const UpdateUserRole = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

 
  const roleOptions = ["Admin", "Manager", "Client", "Employee"];

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedUser || !role) {
      setMessage("Please select a user and role.");
      return;
    }

    setLoading(true);
    setMessage("");
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        "http://localhost:5000/api/update-role",
        { userId: selectedUser, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    //   setMessage("User role updated successfully!");
      alert("User role updated successfully")
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="outerform">
        <div className="card">
          <h2>Update User Role</h2>

          {message && <p className="message">{message}</p>}

          <form onSubmit={handleUpdate}>
            {/* User Dropdown */}
            <label>Select User</label>
            <select onChange={(e) => setSelectedUser(e.target.value)} required>
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.role})
                </option>
              ))}
            </select>

            {/* Role Dropdown */}
            <label>Select Role</label>
            <select onChange={(e) => setRole(e.target.value)} required>
              <option value="">-- Select Role --</option>
              {roleOptions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Role"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUserRole;
