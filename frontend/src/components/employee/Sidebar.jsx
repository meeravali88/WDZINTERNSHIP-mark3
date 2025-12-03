// frontend/src/components/employee/Sidebar.jsx
import React, { useState, useEffect, useRef } from "react";

const NavItem = ({ icon, label, moduleName, activeModule, onNavigate }) => (
  <div
    className={`nav-item ${activeModule === moduleName ? "active" : ""}`}
    data-module={moduleName}
    onClick={() => onNavigate(moduleName)}
  >
    <i className={`fas fa-${icon}`}></i>
    <span>{label}</span>
  </div>
);

const DropdownItem = ({ icon, label, onClick }) => (
  <div className="dropdown-item" onClick={onClick}>
    <i className={`fas fa-${icon}`}></i>
    <span>{label}</span>
  </div>
);

const Sidebar = ({
  user,
  activeModule,
  onNavigate,
  onNewRequestClick,
  onContactManagerClick,
  onNeedHelpClick,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dotsMenuRef = useRef(null);

  const userAvatar = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "JD";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        dotsMenuRef.current &&
        !dotsMenuRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="sidebar">
      <div className="user-profile">
        <div className="avatar">{userAvatar}</div>
        <div className="user-details">
          <h3>{user.name}</h3>
          <p>Construction ERP</p>
        </div>
        <div
          className="dots-menu"
          ref={dotsMenuRef}
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <i className="fas fa-ellipsis-v"></i>
        </div>

        {/* --- ✅ Dropdown Menu --- */}
        <div
          className={`dropdown-menu ${isDropdownOpen ? "active" : ""}`}
          ref={dropdownRef}
        >
          <DropdownItem
            icon="plus-circle"
            label="New Request"
            onClick={() => {
              onNewRequestClick();
              setDropdownOpen(false);
            }}
          />
          <DropdownItem
            icon="address-book"
            label="Contact Manager"
            onClick={() => {
              onContactManagerClick();
              setDropdownOpen(false);
            }}
          />
          <DropdownItem
            icon="question-circle"
            label="Need Help"
            onClick={() => {
              onNeedHelpClick();
              setDropdownOpen(false);
            }}
          />

          {/* --- ✅ LOGOUT BUTTON WORKS NOW --- */}
          <DropdownItem
            icon="sign-out-alt"
            label="Logout"
            onClick={() => {
              // Clear login session
              localStorage.removeItem("loggedInUser");

              // Optional: clear any saved app data
              localStorage.removeItem("constructionERPData");

              // Redirect to login page
              window.location.href = "/";

              // Close dropdown menu
              setDropdownOpen(false);
            }}
          />
        </div>
      </div>

      <div className="nav-menu">
        <NavItem
          icon="chart-line"
          label="Dashboard"
          moduleName="dashboard"
          activeModule={activeModule}
          onNavigate={onNavigate}
        />
        <NavItem
          icon="tasks"
          label="Tasks"
          moduleName="tasks"
          activeModule={activeModule}
          onNavigate={onNavigate}
        />
        <NavItem
          icon="cubes"
          label="Materials"
          moduleName="materials"
          activeModule={activeModule}
          onNavigate={onNavigate}
        />
        <NavItem
          icon="building"
          label="My Projects"
          moduleName="projects"
          activeModule={activeModule}
          onNavigate={onNavigate}
        />
        <NavItem
          icon="cog"
          label="Settings"
          moduleName="settings"
          activeModule={activeModule}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};

export default Sidebar;
