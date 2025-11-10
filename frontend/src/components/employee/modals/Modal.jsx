import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal active" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header"><h2>{title}</h2><button className="close-modal" onClick={onClose}>&times;</button></div>
                {children}
            </div>
        </div>
    );
};
export default Modal;