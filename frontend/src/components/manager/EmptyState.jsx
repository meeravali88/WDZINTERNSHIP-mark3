import React from 'react';

const EmptyState = ({ icon, title, message, buttonText, onButtonClick }) => {
    return (
        <div className="empty-state" style={{ padding: buttonText ? '40px 20px' : '20px' }}>
            <i className={`fas fa-${icon}`}></i>
            <h3>{title}</h3>
            <p>{message}</p>
            {buttonText && (
                <button className="btn btn-primary" onClick={onButtonClick}>
                    <i className="fas fa-plus"></i> {buttonText}
                </button>
            )}
        </div>
    );
};

export default EmptyState;