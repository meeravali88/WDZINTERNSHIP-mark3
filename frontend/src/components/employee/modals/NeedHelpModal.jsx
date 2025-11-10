import React from 'react';
import Modal from './Modal';
const NeedHelpModal = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Need Help">
        <div className="contact-card"><h3>IT Support</h3><p>Email: support@erp.com</p><p>Phone: 555-0122</p></div>
    </Modal>
);
export default NeedHelpModal;