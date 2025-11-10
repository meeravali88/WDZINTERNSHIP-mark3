import React, { useState, useEffect } from 'react';

const SettingsModule = ({ userProfile, onLogout }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('builderp_darkTheme') === 'true');

    useEffect(() => {
        if (isDarkTheme) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        localStorage.setItem('builderp_darkTheme', isDarkTheme);
    }, [isDarkTheme]);

    return (
        <div className="module-container active" id="settings-module">
             <div className="header">
                <h2>System Settings</h2>
                <div className="user-info">
                    <button className="logout-btn" onClick={onLogout}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </div>

            <div className="settings-grid">
                <div className="settings-card">
                    <h3><i className="fas fa-palette"></i> Theme Settings</h3>
                    <div className="settings-option">
                        <div className="option-info">
                            <h4>Dark Mode</h4>
                            <p>Switch between light and dark themes</p>
                        </div>
                        <label className="toggle-switch">
                            <input 
                                type="checkbox" 
                                id="themeToggle" 
                                checked={isDarkTheme}
                                onChange={(e) => setIsDarkTheme(e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
                <div className="settings-card">
                    <h3><i className="fas fa-info-circle"></i> System Information</h3>
                    <div className="system-info">
                        <div className="info-item"><span>System Version</span><span>BuildERP v2.1.0 React</span></div>
                        <div className="info-item"><span>Last Updated</span><span>{new Date().toLocaleDateString()}</span></div>
                        <div className="info-item"><span>Status</span><span className="status-badge status-active">Online</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModule;