import { useState } from 'react';
import Modal from './Modal';

const ApprovalModal = ({ isOpen, onClose, onSubmit, projects }) => {
    const [formData, setFormData] = useState({ type: 'material', projectId: '', amount: '', description: '', priority: 'medium' });
    const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ type: 'material', projectId: '', amount: '', description: '', priority: 'medium' });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Request">
            <form onSubmit={handleSubmit}>
                <div className="form-group"><label className="form-label">Request Type</label>
                    <select className="form-control" id="type" value={formData.type} onChange={handleChange} required>
                        <option value="material">Material Purchase</option><option value="budget">Budget Revision</option><option value="equipment">Equipment Rental</option><option value="personnel">Personnel Request</option>
                    </select>
                </div>
                <div className="form-group"><label className="form-label">Project</label>
                    <select className="form-control" id="projectId" value={formData.projectId} onChange={handleChange} required>
                        <option value="">Select Project</option>
                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>
                <div className="form-group"><label className="form-label">Amount</label><input type="number" className="form-control" id="amount" value={formData.amount} onChange={handleChange} required /></div>
                <div className="form-group"><label className="form-label">Description</label><textarea className="form-control" id="description" value={formData.description} onChange={handleChange} rows="3"></textarea></div>
                <div className="form-group"><label className="form-label">Priority</label>
                    <select className="form-control" id="priority" value={formData.priority} onChange={handleChange} required>
                        <option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
                    </select>
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '25px' }}>
                    <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Submit Request</button>
                </div>
            </form>
        </Modal>
    );
};
export default ApprovalModal;