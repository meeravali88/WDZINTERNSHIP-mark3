import React from 'react';

const Logout = ({ onCancelLogout, onConfirmLogout }) => {
    return (
        <div className="module-content active" id="logout">
            {alert("You have been logged out.")}
        </div>
    );
};
export default Logout;