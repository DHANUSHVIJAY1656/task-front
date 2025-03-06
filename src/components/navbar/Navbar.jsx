import React from "react";
import "../navbar/nav.css";

const Navbar = () => {
  return (
  <>
  <div className="continer">
     <nav className="navbar">
       <div className="logo-con">
          Task Management
       </div>
       <div className="heading-con">
       <ul className="nav-links">
       <li><a href="/" className="nav-item">Home</a></li>
       <li><a href="/login" className="nav-item">login</a></li>
       <li><a href="/" className="nav-item">dashboard</a></li>
       <li><a href="/" className="nav-item">Logout</a></li>
      </ul>
      </div>
     </nav>
  </div>
  
  </>
  );
};

export default Navbar;