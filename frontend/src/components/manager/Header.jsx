import React from 'react';

const Header = ({ title, userProfile, onOpenProfile, onOpenSettings, onLogout }) => {

    // 🔥 FIX 1 — Avatar should always be first letter only
    const userAvatar = (userProfile?.name?.charAt(0) || "M").toUpperCase();

    // 🔥 FIX 2 — Force Manager always (ignore localStorage role)
    const fixedRole = "Manager";

    return (
        <div className="header">

            {/* PAGE TITLE */}
            <h2 className="header-title">
                {title || "Module"}
            </h2>

            {/* USER SECTION */}
            <div className="user-info">

                {/* USER DROPDOWN */}
                <div className="user-dropdown">
                    <div className="user-avatar">
                        {userAvatar}
                    </div>

                    <div className="user-dropdown-content">

                        <button
                            className="dropdown-item"
                            onClick={onOpenProfile}
                        >
                            <i className="fas fa-user"></i> Profile
                        </button>

                        <button
                            className="dropdown-item"
                            onClick={onOpenSettings}
                        >
                            <i className="fas fa-cog"></i> Settings
                        </button>

                        <button
                            className="dropdown-item"
                            onClick={onLogout}
                        >
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </button>

                    </div>
                </div>

                {/* USER TEXT DETAILS */}
                <div className="user-details">

                    {/* User Name */}
                    <div className="user-name">
                        {userProfile?.name}
                    </div>

                    {/* 🔥 FIX 3 — REMOVE employee → show only Manager */}
                    <div className="user-role">
                        {fixedRole}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Header;
