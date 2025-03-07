import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import CreateTask from "./components/createtask/Createtask";
import Tasklist from "./pages/Admin/TaskList";
import AddComment from "./pages/Admin/AddComments";
import Home from "./components/homepage/home";
import Admindashboardhome from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import Register from "./pages/Auth/Register";
import CreateProject from "./components/projectcomponent/ProjectFrom";
import UpdateProject from "./components/projectcomponent/updateproject";
import ProjectList from "./components/projectcomponent/ProjectList";
import UpdateUserRole from "./components/manage role/updaterole";
import UserList from "./components/manage role/userlist";
import UserRoleList from "./components/manage role/UserRoleList";

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

       
        <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
          <Route path="/AdminDashboard" element={<Admindashboardhome />} />
          <Route path="/createproject" element={<CreateProject/>}/>
          <Route path="/Createtask" element={<CreateTask />} />
          <Route path="/Usermanagement" element={<Register />} />
          <Route path ="/updateproject" element={<UpdateProject/>}/>
          <Route path ="/viewallproject" element={<ProjectList />} />
          <Route path ="/Updaterole" element={<UpdateUserRole />} />
          <Route path ="/Viewalluser" element={<UserList />} />
          <Route path="/Viewroleuser" element={<UserRoleList/>} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["Manager"]} />}>
          <Route path="/addcomments" element={<AddComment />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["Employee"]} />}>
          <Route path="/tasks" element={<Tasklist />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
