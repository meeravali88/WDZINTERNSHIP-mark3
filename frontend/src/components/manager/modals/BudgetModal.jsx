import React, { useState } from 'react';
import Modal from './Modal';

const BudgetModal = ({ isOpen, onClose, onSubmit, projects }) => {
    const [formData, setFormData] = useState({ name: '', amount: '', projectId: '', category: 'labor' });
    const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, amount: parseFloat(formData.amount) });
        setFormData({ name: '', amount: '', projectId: '', category: 'labor' });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Budget">
            <form onSubmit={handleSubmit}>
                <div className="form-group"><label className="form-label">Budget Name</label><input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required /></div>
                <div className="form-group"><label className="form-label">Amount</label><input type="number" className="form-control" id="amount" value={formData.amount} onChange={handleChange} required /></div>
                <div className="form-group"><label className="form-label">Project</label>
                    <select className="form-control" id="projectId" value={formData.projectId} onChange={handleChange} required>
                        <option value="">Select Project</option>
                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>
                <div className="form-group"><label className="form-label">Category</label>
                    <select className="form-control" id="category" value={formData.category} onChange={handleChange} required>
                        <option value="labor">Labor</option><option value="materials">Materials</option><option value="equipment">Equipment</option><option value="subcontractors">Subcontractors</option><option value="overhead">Overhead</option>
                    </select>
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '25px' }}>
                    <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Create Budget</button>
                </div>
            </form>
        </Modal>
    );
};
export default BudgetModal;