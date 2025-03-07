import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="container">
      <h1 className="title">Task Management</h1>
      <p className="subtitle">Organize your tasks efficiently</p>
      <Link to="/login">
        <button className="button">Click Me</button>
      </Link>
    </div>
  );
};

export default Home;
