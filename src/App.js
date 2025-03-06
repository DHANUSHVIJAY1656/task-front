import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateTask from "./pages/Admin/Createtask";
import Tasklist from "./pages/Admin/TaskList";
import AddComment from "./pages/Admin/AddComments";


const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Createtask" element={<CreateTask />} />
        <Route path="/Tasklist" element={<Tasklist />} />
        <Route path="/addcomments" element={<AddComment />} />
      </Routes>
     
    </Router>
  );
};

export default App;
