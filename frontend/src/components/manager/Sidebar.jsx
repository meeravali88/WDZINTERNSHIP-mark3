// components/manager/Sidebar.jsx (final patched version)
import React from "react";
// import "../../styles/ManagerSidebar.css";

const NavItem = ({ icon, label, moduleName, activeModule, onNavigate }) => (
  <div
    className={`nav-item ${activeModule === moduleName ? "active" : ""}`}
    onClick={() => onNavigate(moduleName)}
  >
    <i className={`fas fa-${icon}`}></i>
    <span>{label}</span>
  </div>
);

const Sidebar = ({
  activeModule,
  onNavigate,
  approvalCount,
  isMobileOpen,
  attendance = []
}) => {
  const today = new Date().toISOString().slice(0, 10);
  const todaysCount = attendance.filter((a) => a.date === today).length;
  const userName = JSON.parse(localStorage.getItem("loggedInUser")) || {name: "Manager"};
  const userAvatar = userName.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();     

  return (
    <div className={`sidebar ${isMobileOpen ? "open" : ""}`}>
      <div className="user-profile">
        <div className="avatar">{userAvatar}</div>
        <div className="user-details">
          <h3>{userName?.name}</h3>
          <p>Construction ERP</p>
        </div>
  </div> 

      <div className="nav-menu">
        <NavItem icon="chart-pie" label="Dashboard" moduleName="dashboard" activeModule={activeModule} onNavigate={onNavigate} />
        <NavItem icon="tasks" label="Tasks" moduleName="tasks" activeModule={activeModule} onNavigate={onNavigate} />
        <NavItem icon="cubes" label="Materials" moduleName="materials" activeModule={activeModule} onNavigate={onNavigate} />
        {/* <NavItem icon="users" label="Employees" moduleName="employees" activeModule={activeModule} onNavigate={onNavigate} /> */}
        <NavItem icon="file-alt" label="Projects" moduleName="projects" activeModule={activeModule} onNavigate={onNavigate} />

        {/* Approvals with badge */}
        {/* <div
          className={`nav-item ${activeModule === "approvals" ? "active" : ""}`}
          onClick={() => onNavigate("approvals")}
        >
          <i className="fas fa-check-circle"></i>
          <span>Approvals</span>
          <span className="badge">{approvalCount}</span>
        </div> */}

        {/* 🔥 Attendance with daily badge */}
        <div
          className={`nav-item ${activeModule === "attendance" ? "active" : ""}`}
          onClick={() => onNavigate("attendance")}
        >
          <i className="fas fa-hand-paper"></i>
          <span>Attendance</span>
          <span className="badge attendance-badge">{todaysCount}</span>
        </div>

        <NavItem icon="money-bill-wave" label="Budget" moduleName="budget" activeModule={activeModule} onNavigate={onNavigate} />
        <NavItem icon="cog" label="Settings" moduleName="settings" activeModule={activeModule} onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default Sidebar;
