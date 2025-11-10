import React, { useState } from 'react';
import Modal from './Modal';

const NewRequestModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({ requestType: '', requestTitle: '', requestDescription: '', requestPriority: 'medium', requestDate: '' });
    const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); setFormData({ requestType: '', requestTitle: '', requestDescription: '', requestPriority: 'medium', requestDate: '' }); };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Request">
            <form onSubmit={handleSubmit}>
                <div className="form-group"><label>Type</label><select className="form-control" value={formData.requestType} onChange={e => setFormData({ ...formData, requestType: e.target.value })} required><option value="">Select</option><option value="material">Material</option><option value="leave">Leave</option></select></div>
                <div className="form-group"><label>Title</label><input className="form-control" value={formData.requestTitle} onChange={e => setFormData({ ...formData, requestTitle: e.target.value })} required /></div>
                <div className="form-group"><label>Description</label><textarea className="form-control" value={formData.requestDescription} onChange={e => setFormData({ ...formData, requestDescription: e.target.value })} required /></div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Modal>
    );
};
export default NewRequestModal;