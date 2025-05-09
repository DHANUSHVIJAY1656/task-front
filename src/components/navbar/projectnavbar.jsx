import { Link } from "react-router-dom";
import "../navbar/nav.css";

const ProjectNavbar = () => {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo-con">Task Management</div>
        <div className="heading-con">
          <ul className="nav-links">
            <li>
              <Link to="/AdminDashboard" className="nav-item">
                Home
              </Link>
            </li>
            <li>
              <Link to="/taskandcomments" className="nav-item">
                Create Task 
              </Link>
            </li>
            <li>
              <Link to="/Updateproject" className="nav-item">
                Update Project
              </Link>
            </li>

            <li>
              <Link to="/Viewallproject" className="nav-item">
                View All Project
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className="nav-item"
                onClick={() => localStorage.removeItem("token")}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default ProjectNavbar;
