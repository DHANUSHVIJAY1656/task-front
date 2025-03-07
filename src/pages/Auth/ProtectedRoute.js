import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if no token
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    if (allowedRoles.includes(userRole)) {
      return <Outlet />; // Allow access if role matches
    } else {
      return <Navigate to="/" replace />; // Redirect unauthorized users
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login" replace />; // Redirect if token is invalid
  }
};

export default ProtectedRoute;
