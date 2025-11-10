import React from 'react';
import Modal from './Modal';
const ContactManagerModal = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Manager">
        <div className="contact-card"><h3>Project Manager</h3><p>Email: manager@erp.com</p><p>Phone: 555-0199</p></div>
    </Modal>
);
export default ContactManagerModal;