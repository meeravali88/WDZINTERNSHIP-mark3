import React from 'react';

const Notification = ({ message, type, visible }) => {
    if (!visible) return null;
    return (
        <div className={`notification ${type} visible`}>
            {message}
        </div>
    );
};

export default Notification;