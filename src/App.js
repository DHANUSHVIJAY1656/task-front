import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Auth/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;
