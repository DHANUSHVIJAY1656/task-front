import { Link } from "react-router-dom";
import "../navbar/nav.css";

const Navbar = () => {
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
              <Link to="/Updaterole" className="nav-item">
                Update Role
              </Link>
            </li>

            <li>
              <Link to="/Viewalluser" className="nav-item">
                View All User
              </Link>
            </li>

            <li>
              <Link to="/Viewroleuser" className="nav-item">
                View RolebyUser
              </Link>
            </li>

            <li>
              <Link
                to="/login"
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

export default Navbar;
