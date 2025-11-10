import React from 'react';

const Logout = ({ onCancelLogout, onConfirmLogout }) => {
    return (
        <div className="module-content active" id="logout">
            <div className="logout-content">
                <i className="fas fa-sign-out-alt"></i>
                <h3>Logout from Construction ERP</h3>
                <p>Are you sure you want to logout?</p>
                <button className="btn btn-cancel" onClick={onCancelLogout}>Cancel</button>
                <button className="btn btn-logout" onClick={onConfirmLogout}>Logout</button>
            </div>
        </div>
    );
};
export default Logout;