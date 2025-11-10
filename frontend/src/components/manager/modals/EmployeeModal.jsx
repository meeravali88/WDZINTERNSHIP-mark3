import React, { useState } from 'react';
import Modal from './Modal';

const EmployeeModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({ name: '', position: '', department: 'engineering', email: '', phone: '' });
    const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', position: '', department: 'engineering', email: '', phone: '' });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Employee">
            <form onSubmit={handleSubmit}>
                <div className="form-group"><label className="form-label">Full Name</label><input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required /></div>
                <div className="form-group"><label className="form-label">Position</label><input type="text" className="form-control" id="position" value={formData.position} onChange={handleChange} required /></div>
                <div className="form-group"><label className="form-label">Department</label>
                    <select className="form-control" id="department" value={formData.department} onChange={handleChange} required>
                        <option value="engineering">Engineering</option><option value="operations">Operations</option><option value="safety">Health & Safety</option><option value="logistics">Logistics</option><option value="administration">Administration</option>
                    </select>
                </div>
                <div className="form-group"><label className="form-label">Email</label><input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required /></div>
                <div className="form-group"><label className="form-label">Phone</label><input type="tel" className="form-control" id="phone" value={formData.phone} onChange={handleChange} required /></div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '25px' }}>
                    <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Add Employee</button>
                </div>
            </form>
        </Modal>
    );
};
export default EmployeeModal;