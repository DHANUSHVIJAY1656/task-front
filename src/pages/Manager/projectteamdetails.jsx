// import { useState, useEffect } from "react";
// import axios from "axios";
// import "../../styles.css/ProjectUsers.css";

// export default function ProjectUsers() {
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [users, setUsers] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/projects").then((response) => {
//       setProjects(response.data);
//     });
//   }, []);

//   const fetchUsers = async (projectId) => {
//     setSelectedProject(projectId);
//     try {
//       const response = await axios.get(`http://localhost:5000/api/projects/${projectId}/users`);
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users", error);
//     }
//   };

//   return (
//     <div className="container">
//       <select onChange={(e) => fetchUsers(e.target.value)} className="dropdown">
//         <option value="">Select a project</option>
//         {projects.map((project) => (
//           <option key={project._id} value={project._id}>
//             {project.project_name}
//           </option>
//         ))}
//       </select>

//       {users && (
//         <div className="card">
//           <h2>{users.project_name}</h2>
//           <div className="section">
//             <h3>Clients</h3>
//             <ul>
//               {users.clients.map((client) => (
//                 <li key={client._id}>{client.name} ({client.email})</li>
//               ))}
//             </ul>
//           </div>
//           <div className="section">
//             <h3>Employees</h3>
//             <ul>
//               {users.employees.map((employee) => (
//                 <li key={employee._id}>{employee.name} ({employee.email})</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
