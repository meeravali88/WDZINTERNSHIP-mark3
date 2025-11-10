import React from 'react';

const Header = ({ user }) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="header">
            <div className="header-info">
                <div className="employee-profile">
                    <div className="employee-details">
                        <h2>{user.name}</h2>
                        <p>{user.position} - Construction ERP</p>
                    </div>
                    <h1>Employee Dashboard</h1>
                </div>
            </div>
            <div className="date-display">{currentDate}</div>
        </div>
    );
};

export default Header;