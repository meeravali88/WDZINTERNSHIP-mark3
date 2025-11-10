import React from 'react';

const Toast = ({ message, isError, show }) => {
    return (
        <div className={`toast ${show ? 'show' : ''} ${isError ? 'error' : ''}`}>
            <i className={`fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}`}></i>
            <span>{message}</span>
        </div>
    );
};

export default Toast;