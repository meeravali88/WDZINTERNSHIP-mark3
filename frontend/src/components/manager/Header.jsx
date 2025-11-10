import React from 'react';

const Header = ({ title, userProfile, onOpenProfile, onOpenSettings, onLogout }) => {
    const userAvatar = userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <div className="header">
            <h2>{title}</h2>
            <div className="user-info">
                <div className="user-dropdown">
                    <div className="user-avatar">{userAvatar}</div>
                    <div className="user-dropdown-content">
                        <a href="#" onClick={(e) => { e.preventDefault(); onOpenProfile(); }}>
                            <i className="fas fa-user"></i> Profile
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); onOpenSettings(); }}>
                            <i className="fas fa-cog"></i> Settings
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }}>
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </a>
                    </div>
                </div>
                <div>
                    <div style={{ fontWeight: 500 }}>{userProfile.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>{userProfile.role}</div>
                </div>
            </div>
        </div>
    );
};

export default Header;