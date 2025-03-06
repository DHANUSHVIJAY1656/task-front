import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="/admin/dashboard">Admin Dashboard</a></li>
        <li><a href="/manager/dashboard">Manager Dashboard</a></li>
        <li><a href="/employee/dashboard">Employee Dashboard</a></li>
        <li><a href="/client/dashboard">Client Dashboard</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;