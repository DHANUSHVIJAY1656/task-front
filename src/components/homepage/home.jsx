import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Task Management</h1>
      <p className="home-subtitle">Organize your tasks efficiently</p>
      <Link to="/login">
        <button className="home-button">Ready to start</button>
      </Link>
    </div>
  );
};

export default Home;
